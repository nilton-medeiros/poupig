import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'OrdenarDescendente',
    aplicar: () => (transacoes) => transacoes.reverse(),
} as FiltroTransacao
