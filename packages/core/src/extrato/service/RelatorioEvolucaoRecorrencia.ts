import { ExtratoProps, TransacaoProps } from '..'
import CasoDeUso from '../../shared/base/CasoDeUso'
import Resultado from '../../shared/base/Resultado'
import Transacao from '../model/Transacao'

export type In = {
    extratos: ExtratoProps[]
    recorrenciaId: string
}

export default class RelatorioEvolucaoRecorrencia implements CasoDeUso<In, TransacaoProps[]> {
    async executar(entrada: In): Promise<Resultado<TransacaoProps[]>> {
        const evolucoes = entrada.extratos
            .reduce((evolucoes, extrato) => {
                const { transacoes } = extrato
                const parcela = transacoes.find((t) => t.recorrenciaId === entrada.recorrenciaId)
                return parcela ? [...evolucoes, parcela] : evolucoes
            }, [] as TransacaoProps[])
            .sort(Transacao.sort)

        return Resultado.ok(evolucoes)
    }
}
