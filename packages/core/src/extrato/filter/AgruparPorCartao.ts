import { CartaoProps } from '../../cartao'
import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'AgruparPorCartao',
    aplicar: (cartoes: CartaoProps[]) => (transacoes) =>
        transacoes.map((transacao) => {
            const porId = (cartao: CartaoProps) => cartao.id === transacao.cartaoId
            const cartao = cartoes.find(porId)
            const agruparPor = cartao?.descricao ?? transacao.cartaoId
            return { ...transacao, agruparPor }
        }),
} as FiltroTransacao
