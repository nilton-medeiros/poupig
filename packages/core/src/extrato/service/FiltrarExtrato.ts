import { ExtratoProps, TransacaoProps } from '..'
import { FiltroTransacao, filtros as todosOsFiltros } from '../filter'
import CasoDeUso from '../../shared/base/CasoDeUso'
import Extrato from '../model/Extrato'
import FiltroExtrato from '../model/FiltroExtrato'
import Resultado from '../../shared/base/Resultado'

export type In = {
    extrato: ExtratoProps
    filtros: FiltroExtrato[]
}

export default class FiltrarExtrato implements CasoDeUso<In, ExtratoProps> {
    async executar(dados: In): Promise<Resultado<ExtratoProps>> {
        const transacoes = dados.extrato.transacoes
        const filtradas = dados.filtros.reduce(this.aplicarFiltros, transacoes)

        const gerarExtrato = Extrato.novo({ data: dados.extrato.data, transacoes: filtradas })
        if (gerarExtrato.deuErrado) return gerarExtrato.comoFalha
        return Resultado.ok(gerarExtrato.instancia.props)
    }

    private aplicarFiltros(transacoes: TransacaoProps[], filtro: FiltroExtrato) {
        const idFiltro = filtro.id.split(':')[0]
        if (!idFiltro) return transacoes

        const filtroSelecionado = (todosOsFiltros as any)[idFiltro] as FiltroTransacao
        if (!filtroSelecionado) return transacoes

        return filtroSelecionado.aplicar(filtro.params)(transacoes)
    }
}
