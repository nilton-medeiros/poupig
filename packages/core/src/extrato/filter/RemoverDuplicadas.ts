import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'RemoverDuplicadas',
    aplicar: () => (transacoes) =>
        transacoes.filter((transacao) => {
            const duplicada = transacoes.find((avulsa: any) => {
                const mesmaRecorrencia = avulsa.recorrenciaId === transacao.recorrenciaId
                const idDiferente = avulsa.id !== transacao.id
                return mesmaRecorrencia && idDiferente
            })
            return !duplicada || !transacao.emMemoria
        }),
} as FiltroTransacao
