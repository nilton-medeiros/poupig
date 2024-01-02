import { ContaProps } from '../../conta'
import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'AgruparPorConta',
    aplicar: (contas: ContaProps[]) => (transacoes) =>
        transacoes.map((transacao) => {
            const porId = (conta: ContaProps) => conta.id === transacao.contaId
            const conta = contas.find(porId)
            const agruparPor = conta?.descricao ?? transacao.contaId
            return { ...transacao, agruparPor }
        }),
} as FiltroTransacao
