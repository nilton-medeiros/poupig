import { fn, IdUnico } from 'utils'
import { TipoOperacao } from '../model/TipoOperacao'
import { TransacaoProps } from '..'
import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'ConsolidarPorDespesas',
    aplicar: () => (transacoes) => {
        const despesas = transacoes.filter((t) => t.operacao === TipoOperacao.DESPESA)
        if (despesas.length === 0) return transacoes

        const consolidada =
            despesas.reduce((despesas: TransacaoProps, transacao: TransacaoProps) => {
                return {
                    ...despesas,
                    id: IdUnico.gerar(),
                    nome: 'Despesas',
                    data: fn.dt.min(despesas.data, transacao.data),
                    valor: despesas.valor + transacao.valor,
                    operacao: TipoOperacao.DESPESA,
                    virtual: true,
                    categoriaId: undefined,
                    consolidada: false,
                    contaId: null,
                    cartaoId: null,
                } as TransacaoProps
            }) ?? []

        return [consolidada].concat(transacoes?.filter((t) => t.operacao === TipoOperacao.RECEITA))
    },
} as FiltroTransacao
