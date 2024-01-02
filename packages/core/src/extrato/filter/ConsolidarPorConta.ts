import { ContaProps } from '../../conta'
import { IdUnico } from 'utils'
import { TransacaoProps } from '..'
import { Utils } from './utils'
import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'ConsolidarPorConta',
    aplicar: (contas: ContaProps[]) => (transacoes) => {
        const consolidadas =
            contas
                .map((c) => {
                    const trsDaConta = transacoes?.filter((t) => t.contaId === c.id)
                    if (!trsDaConta?.length) return null

                    const menorData = trsDaConta.reduce((menor: Date | null, t) => {
                        if (!menor) return t.data
                        return t.data < menor ? t.data : menor
                    }, null)

                    return {
                        id: IdUnico.gerar(),
                        nome: c.descricao,
                        data: menorData ?? new Date(),
                        ...Utils.valorEOperacao(trsDaConta),
                        contaId: c.id,
                        virtual: true,
                    } as TransacaoProps
                })
                .filter((c) => c) ?? []

        return (consolidadas as TransacaoProps[]).concat(transacoes?.filter((t) => !t.contaId))
    },
} as FiltroTransacao
