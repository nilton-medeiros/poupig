import { fn, IdUnico } from 'utils'
import { TransacaoProps } from '..'
import { Utils } from './utils'
import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'ConsolidarPorGrupo',
    aplicar: () => (transacoes) => {
        const grupos = transacoes.reduce((grupos: string[], t: TransacaoProps) => {
            if (grupos.includes(t.agruparPor ?? '<sem grupo>')) return grupos
            return [...grupos, t.agruparPor ?? '<sem grupo>']
        }, [])
        if (!grupos.join('')) return transacoes

        return grupos.reduce((consolidadas: TransacaoProps[], grupo: string) => {
            const transacoesDoGrupo = transacoes.filter((t) => t.agruparPor === grupo)
            if (!transacoesDoGrupo?.length) return consolidadas

            return [
                ...consolidadas,
                {
                    id: IdUnico.gerar(),
                    nome: grupo ? grupo : '<sem grupo>',
                    data: fn.dt.min(...transacoesDoGrupo?.map((t) => t.data)) ?? new Date(),
                    ...Utils.valorEOperacao(transacoesDoGrupo),
                    agruparPor: grupo,
                    virtual: true,
                } as TransacaoProps,
            ]
        }, [])
    },
} as FiltroTransacao
