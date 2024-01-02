import { CartaoDTO, ExtratoDTO, UsuarioDTO } from '../dto'
import {
    AtualizarFaturas,
    ConsultarCartoes,
    ExcluirCartao,
    RepositorioCartao,
    SalvarCartao,
} from 'core'

export default class CartaoFacade {
    constructor(readonly repo: RepositorioCartao) {}

    async salvar(usuario: UsuarioDTO, cartao: CartaoDTO): Promise<void> {
        const casoDeUso = new SalvarCartao(this.repo)
        const resultado = await casoDeUso.executar(cartao, usuario)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
    }

    async excluir(usuario: UsuarioDTO, cartao: CartaoDTO): Promise<void> {
        const casoDeUso = new ExcluirCartao(this.repo)
        const resultado = await casoDeUso.executar(cartao, usuario)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
    }

    async consultar(usuario: UsuarioDTO): Promise<CartaoDTO[]> {
        const casoDeUso = new ConsultarCartoes(this.repo)
        const resultado = await casoDeUso.executar(usuario)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
        return resultado.instancia as CartaoDTO[]
    }

    async atualizarFaturas(usuario: UsuarioDTO, extratos: ExtratoDTO[]): Promise<void> {
        const casoDeUso = new AtualizarFaturas(this.repo)
        const resultado = await casoDeUso.executar(extratos, usuario)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
    }
}
