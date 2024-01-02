import { fn, IdUnico } from 'utils'
import { TipoOperacao } from '../model/TipoOperacao'
import { TransacaoProps } from '..'
import { Utils } from './utils'
import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'ConsolidarPorAvulsas',
    aplicar: () => (transacoes) => {
        const avulsas = transacoes.filter((t) => t.recorrenciaId == null)
        if (avulsas.length === 0) return transacoes

        const consolidada =
            avulsas.reduce((avulsa: TransacaoProps, transacao: TransacaoProps) => {
                return {
                    ...avulsa,
                    id: IdUnico.gerar(),
                    nome: 'Avulsas',
                    data: fn.dt.min(avulsa.data, transacao.data)!,
                    ...Utils.valorEOperacao(avulsas),
                    virtual: true,
                    categoriaId: undefined,
                    consolidada: false,
                }
            }) ?? []

        return [consolidada].concat(transacoes?.filter((t) => t.operacao === TipoOperacao.RECEITA))
    },
} as FiltroTransacao
