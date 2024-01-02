import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'RemoverExcluidas',
    aplicar: () => (transacoes) => {
        return transacoes.filter((transacao) => {
            return !transacao.deletedAt
        })
    },
} as FiltroTransacao
