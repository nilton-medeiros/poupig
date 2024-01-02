import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'OrdenarPorNome',
    aplicar: () => (transacoes) => {
        return [...transacoes].sort((t1, t2) => {
            const v1 = `${t1.agruparPor ?? ''}${t1.nome ?? ''}`
            const v2 = `${t2.agruparPor ?? ''}${t2.nome ?? ''}`
            return v1.localeCompare ? v1.localeCompare(v2, 'pt') : v1 > v1 ? 1 : v1 < v1 ? -1 : 0
        })
    },
} as FiltroTransacao
