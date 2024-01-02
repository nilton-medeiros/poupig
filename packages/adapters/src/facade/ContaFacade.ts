import { ExtratoDTO, UsuarioDTO, ContaDTO } from '../dto'
import { AtualizarSaldos, ConsultarContas, ExcluirConta, RepositorioConta, SalvarConta } from 'core'

export default class ContaFacade {
    constructor(readonly repo: RepositorioConta) {}

    async salvar(usuario: UsuarioDTO, conta: ContaDTO): Promise<void> {
        const casoDeUso = new SalvarConta(this.repo)
        const resultado = await casoDeUso.executar(conta, usuario)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
    }

    async excluir(usuario: UsuarioDTO, conta: ContaDTO): Promise<void> {
        const casoDeUso = new ExcluirConta(this.repo)
        const resultado = await casoDeUso.executar(conta, usuario)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
    }

    async consultar(usuario: UsuarioDTO): Promise<ContaDTO[]> {
        const casoDeUso = new ConsultarContas(this.repo)
        const resultado = await casoDeUso.executar(usuario)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
        return resultado.instancia as ContaDTO[]
    }

    async atualizarSaldos(usuario: UsuarioDTO, extratos: ExtratoDTO[]): Promise<void> {
        const casoDeUso = new AtualizarSaldos(this.repo)
        const resultado = await casoDeUso.executar(extratos, usuario)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
    }
}
