import { Id, Cartao, RepositorioCartao, Resultado, UsuarioProps } from 'core'
import { ProvedorDados } from '..'

export default class ColecaoCartao implements RepositorioCartao {
    constructor(private provedor: ProvedorDados) {}

    async salvar(usuario: UsuarioProps, cartao: Cartao): Promise<Resultado<void>> {
        return Resultado.tentar(async () => {
            const docExiste = await this.provedor.existe(this._caminho(usuario), cartao.id.valor)
            const doc: any = { ...cartao.props, updatedAt: new Date(), deleteAt: null }
            if (!docExiste || !doc.createdAt) doc.createdAt = new Date()
            await this.provedor.salvar(this._caminho(usuario), doc)
            return Resultado.ok()
        })
    }

    async salvarTodos(usuario: UsuarioProps, cartoes: Cartao[]): Promise<Resultado<void>> {
        return Resultado.tentar(async () => {
            await Promise.all(cartoes.map((c) => this.salvar(usuario, c)))
            return Resultado.ok()
        })
    }

    async excluir(usuario: UsuarioProps, cartaoId: Id): Promise<Resultado<void>> {
        return Resultado.tentar(async () => {
            await this.provedor.salvarAtribs(this._caminho(usuario), cartaoId.valor, {
                deletedAt: new Date(),
            })
            return Resultado.ok()
        })
    }

    async consultar(usuario: UsuarioProps): Promise<Resultado<Cartao[]>> {
        return Resultado.tentar(async () => {
            const docs = await this.provedor.buscarTodos(this._caminho(usuario), 'createdAt')
            return Cartao.novos(docs.filter((doc) => !doc.deletedAt))
        })
    }

    private _caminho(usuario: UsuarioProps): string {
        return `cartoes/${usuario.email}/itens`
    }
}
