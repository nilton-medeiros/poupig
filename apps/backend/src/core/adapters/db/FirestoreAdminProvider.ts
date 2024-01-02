import { ComandoBatch, ProvedorDados, Filtro, Pagina, DirecaoOrdenacao } from 'adapters'
import { firestore } from 'firebase-admin'
import { fn } from 'utils'
import app from '../config/app'

export default class FirestoreAdminProvider implements ProvedorDados {
    private db: firestore.Firestore

    constructor() {
        this.db = firestore(app)
    }

    async salvar(caminho: string, entidade: any, id?: string): Promise<any> {
        const docRef = this.db
            .doc(`${caminho}/${id ?? entidade.id}`)
            .withConverter(this.conversor())
        await docRef.set(entidade)
        return entidade
    }

    async salvarAtribs(caminho: string, id: string, attributes: any): Promise<void> {
        const docRef = this.db.doc(`${caminho}/${id}`)
        const exists = (await docRef.get()).exists
        exists ? docRef.update(attributes) : docRef.set(attributes)
    }

    async salvarTodos(caminhos: string[], entidades: any[]): Promise<void> {
        if (caminhos.length !== entidades.length) throw new Error('bad arguments')

        const batch = this.db.batch()

        entidades.forEach((entidade, i) => {
            const docRef = this.db
                .doc(`${caminhos[i]}/${(entidade as any)?.id}`)
                .withConverter(this.conversor())
            const entidadeFinal = this._updateDate(entidade)
            batch.set(docRef, entidadeFinal)
        })

        await batch.commit()
    }

    async existe(caminho: string, id: string): Promise<boolean> {
        const docRef = this.db.doc(`${caminho}/${id}`)
        return (await docRef.get()).exists
    }

    async buscarTodos(
        caminho: string,
        orderByAtt?: string,
        direction?: DirecaoOrdenacao
    ): Promise<any[]> {
        const colRef = this.db.collection(caminho).withConverter(this.conversor())

        let result: firestore.QuerySnapshot<any>
        if (orderByAtt) {
            const qry = colRef.orderBy(orderByAtt, direction)
            result = await qry.get()
        } else {
            result = await colRef.get()
        }

        return result.docs.map((doc) => doc.data()).filter((d) => !d.deletedAt) ?? []
    }

    async buscarPagina(
        caminho: string,
        orderByAtt: string,
        direction: DirecaoOrdenacao,
        qty?: number,
        lastValues?: any
    ): Promise<Pagina> {
        const colRef = this.db.collection(caminho).withConverter(this.conversor())

        let query: firestore.Query
        if (lastValues) {
            query = colRef.startAfter(lastValues)
            query = query.limit(qty ?? 20)
            if (orderByAtt) query = query.orderBy(orderByAtt, direction)
        } else {
            query = colRef.limit(qty ?? 20)
        }

        const result = await query.get()
        const data: any[] = result.docs.map((doc) => doc.data()) ?? []

        return {
            dados: data,
            proximo: () =>
                this.buscarPagina(caminho, orderByAtt, direction, qty, data[data.length - 1]),
        }
    }

    async buscarPor(
        caminho: string,
        filters: Filtro[],
        orderByAtt?: string,
        direction?: DirecaoOrdenacao
    ): Promise<any[]> {
        const colRef = this.db.collection(caminho).withConverter(this.conversor())

        let query =
            filters?.reduce((qry: firestore.Query | null, f) => {
                if (!qry) return colRef.where(f.attribute, f.op, f.value)
                return qry.where(f.attribute, f.op, f.value)
            }, null) ?? colRef

        if (orderByAtt) query = query.orderBy(orderByAtt, direction)

        const result = await query.get()
        return result.docs.map((doc) => doc.data()) ?? []
    }

    async buscarPorId(caminho: string, id: string): Promise<any | null> {
        if (!id) return null
        const docRef = this.db.doc(`${caminho}/${id}`).withConverter(this.conversor())
        const result = await docRef.get()
        return result.data()
    }

    async buscarPorIds(caminho: string, ids: string[]): Promise<any[]> {
        if (!ids || ids.length === 0) return []
        const colRef = this.db.collection(caminho).withConverter(this.conversor())

        // Firebase só permite consultar 10 elementos dentro do "in"
        const queries = this._splitInGroupsOf(10, ids).map(async (ids) => {
            const qry = colRef.where('id', 'in', ids)
            const result = await qry.get()
            return result.docs.map((doc) => doc.data()) ?? []
        })

        const datas = await Promise.all(queries)
        return datas.flatMap((d) => d)
    }

    async excluir(caminho: string, id: string): Promise<boolean> {
        if (!id) return false
        const docRef = this.db.doc(`${caminho}/${id}`).withConverter(this.conversor())

        const fromDb = await docRef.get()
        if (!fromDb.exists) return false
        await docRef.delete()
        return true
    }

    async excluirTodos(caminho: string, ids: string[]): Promise<void> {
        const batch = this.db.batch()

        ids.forEach((id) => {
            const docRef = this.db.doc(`${caminho}/${id}`)
            batch.delete(docRef)
        })

        await batch.commit()
    }

    async executarTodos(comandos: ComandoBatch[]): Promise<void> {
        const batch = this.db.batch()

        comandos.forEach((comando) => {
            const id = comando.id ?? (comando.entidade as any)?.id
            const caminho = `${comando.caminho}/${id}`
            const docRef = this.db.doc(caminho).withConverter(this.conversor())
            comando.tipo === 'excluir' ? batch.delete(docRef) : batch.set(docRef, comando.entidade)
        })

        await batch.commit()
    }

    private _splitInGroupsOf(qty: number, array: any[]): any[] {
        return [...array].reduce((groups, id, i) => {
            const groupId = Math.floor(i / qty)
            const group = groups[groupId] ?? []
            group.push(id)
            groups[groupId] = group
            return groups
        }, [])
    }

    private _updateDate(entidade: any) {
        return entidade?.updatedAt
            ? entidade.clone?.({
                  updatedAt: new Date(),
              }) ?? entidade
            : entidade
    }

    conversor() {
        return {
            toFirestore: function (entidade: any) {
                return fn.obj.undefinedParaNull(entidade)
            },
            fromFirestore: function (snapshot: firestore.QueryDocumentSnapshot): any {
                const dadosPuro: any = snapshot?.data()
                const dados = fn.dt.converterDataFS(dadosPuro)
                return dados
            },
        }
    }
}
