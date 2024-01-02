import {
    CartaoDTO,
    CategoriaDTO,
    ContaDTO,
    ExtratoDTO,
    FiltroExtratoDTO,
    RecorrenciaDTO,
    TransacaoDTO,
    UsuarioDTO,
} from '../dto'
import {
    ConsultarExtrato,
    ConsultarExtratos,
    ConsultarFiltrosExtrato,
    ConsultarRecorrencia,
    ConsultarRecorrencias,
    ExcluirRecorrencia,
    ExcluirTransacao,
    FiltrarExtrato,
    PublicadorEvento,
    RelatorioEvolucaoRecorrencia,
    RepositorioExtrato,
    SalvarRecorrencia,
    SalvarTransacao,
} from 'core'

export default class ExtratoFacade {
    constructor(
        private repo: RepositorioExtrato,
        private publicadorEvento: PublicadorEvento
    ) {}

    async salvarTransacao(
        usuario: UsuarioDTO,
        extrato: ExtratoDTO,
        transacao: TransacaoDTO
    ): Promise<void> {
        const consultar = new ConsultarExtrato(this.repo)
        const casoDeUso = new SalvarTransacao(this.repo, consultar, this.publicadorEvento)
        const resultado = await casoDeUso.executar({ extrato, transacao }, usuario)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
    }

    async salvarRecorrencia(usuario: UsuarioDTO, recorrencia: RecorrenciaDTO): Promise<void> {
        const casoDeUso = new SalvarRecorrencia(this.repo, this.publicadorEvento)
        const resultado = await casoDeUso.executar(recorrencia, usuario)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
    }

    async consultarTodos(usuario: UsuarioDTO, datas: Date[]): Promise<ExtratoDTO[]> {
        const casoDeUso = new ConsultarExtratos(this.repo)
        const resultado = await casoDeUso.executar(datas, usuario)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
        return resultado.instancia
    }

    async consultarRecorrencia(usuario: UsuarioDTO, id: string): Promise<RecorrenciaDTO | null> {
        const casoDeUso = new ConsultarRecorrencia(this.repo)
        const resultado = await casoDeUso.executar(id, usuario)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
        return resultado.instancia
    }

    async consultarRecorrencias(usuario: UsuarioDTO): Promise<RecorrenciaDTO[]> {
        const casoDeUso = new ConsultarRecorrencias(this.repo)
        const resultado = await casoDeUso.executar(usuario)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
        return resultado.instancia
    }

    async consultarFiltrosExtrato(
        cartoes: CartaoDTO[],
        categorias: CategoriaDTO[],
        contas: ContaDTO[]
    ): Promise<FiltroExtratoDTO[]> {
        const casoDeUso = new ConsultarFiltrosExtrato()
        const resultado = await casoDeUso.executar({
            cartoes,
            categorias,
            contas,
        })
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
        return resultado.instancia
    }

    async excluirTransacao(
        usuario: UsuarioDTO,
        extrato: ExtratoDTO,
        transacao: TransacaoDTO
    ): Promise<void> {
        const casoDeUso = new ExcluirTransacao(this.repo, this.publicadorEvento)
        const resultado = await casoDeUso.executar({ extrato, transacao }, usuario)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
    }

    async excluirRecorrencia(usuario: UsuarioDTO, recorrenciaId: string): Promise<void> {
        const casoDeUso = new ExcluirRecorrencia(this.repo, this.publicadorEvento)
        const resultado = await casoDeUso.executar(recorrenciaId, usuario)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
    }

    async filtarExtrato(extrato: ExtratoDTO, filtros: FiltroExtratoDTO[]): Promise<ExtratoDTO> {
        const casoDeUso = new FiltrarExtrato()
        const resultado = await casoDeUso.executar({ extrato, filtros })
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
        return resultado.instancia
    }

    async relatorioEvolucaoRecorrencia(
        extratos: ExtratoDTO[],
        recorrenciaId: string
    ): Promise<TransacaoDTO[]> {
        const dto = { extratos, recorrenciaId }
        const casoDeUso = new RelatorioEvolucaoRecorrencia()
        const resultado = await casoDeUso.executar(dto)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
        return resultado.instancia
    }
}
