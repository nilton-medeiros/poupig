import { fn } from 'utils'
import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'AgruparPorData',
    aplicar: () => (transacoes) =>
        transacoes.map((transacao) => {
            const fmt = fn.dtfmt.data(transacao.data)
            const agruparPor = `${fmt.mmm.space.dd.valor}, ${fmt.wdd.valor}`
            return { ...transacao, agruparPor }
        }),
} as FiltroTransacao
