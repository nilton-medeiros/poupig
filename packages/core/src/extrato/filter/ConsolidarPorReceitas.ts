import { fn, IdUnico } from 'utils'
import { TipoOperacao } from '../model/TipoOperacao'
import { TransacaoProps } from '..'
import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'ConsolidarPorReceitas',
    aplicar: () => (transacoes) => {
        const receitas = transacoes.filter((t) => t.operacao === TipoOperacao.RECEITA)
        if (receitas.length === 0) return transacoes

        const consolidada =
            receitas.reduce((receitas: TransacaoProps, transacao: TransacaoProps) => {
                return {
                    ...receitas,
                    id: IdUnico.gerar(),
                    nome: 'Receitas',
                    data: fn.dt.min(receitas.data, transacao.data),
                    valor: receitas.valor + transacao.valor,
                    operacao: TipoOperacao.RECEITA,
                    virtual: true,
                    categoriaId: undefined,
                    consolidada: false,
                    contaId: null,
                    cartaoId: null,
                } as TransacaoProps
            }) ?? []

        return [consolidada].concat(transacoes?.filter((t) => t.operacao === TipoOperacao.DESPESA))
    },
} as FiltroTransacao
