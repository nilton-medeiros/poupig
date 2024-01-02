import { Id, Conta, RepositorioConta, Resultado, UsuarioProps } from 'core'
import { ProvedorDados } from '..'

export default class ColecaoConta implements RepositorioConta {
    constructor(private provedor: ProvedorDados) {}

    async salvar(usuario: UsuarioProps, conta: Conta): Promise<Resultado<void>> {
        return Resultado.tentar(async () => {
            const docAtual = await this.provedor.buscarPorId(this._caminho(usuario), conta.id.valor)
            const doc: any = {
                ...conta.props,
                createdAt: docAtual?.createdAt ?? new Date(),
                updatedAt: new Date(),
                deleteAt: null,
            }
            await this.provedor.salvar(this._caminho(usuario), doc)
            return Resultado.ok()
        })
    }

    async salvarTodas(usuario: UsuarioProps, contas: Conta[]): Promise<Resultado<void>> {
        return Resultado.tentar(async () => {
            await Promise.all(contas.map((c) => this.salvar(usuario, c)))
            return Resultado.ok()
        })
    }

    async excluir(usuario: UsuarioProps, contaId: Id): Promise<Resultado<void>> {
        return Resultado.tentar(async () => {
            await this.provedor.salvarAtribs(this._caminho(usuario), contaId.valor, {
                deletedAt: new Date(),
            })
            return Resultado.ok()
        })
    }

    async consultar(usuario: UsuarioProps): Promise<Resultado<Conta[]>> {
        return Resultado.tentar(async () => {
            const docs = await this.provedor.buscarTodos(this._caminho(usuario), 'createdAt')
            return Conta.novas(docs.filter((doc) => !doc.deletedAt))
        })
    }

    private _caminho(usuario: UsuarioProps): string {
        return `contas/${usuario.email}/itens`
    }
}
