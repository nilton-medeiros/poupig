import GerarSumario from './GerarSumario'
import GrupoTransacao from './GrupoTransacao'
import Transacao, { TransacaoProps } from './Transacao'

export default class AgruparTransacoes {
    static com(transacoes: Transacao[]): GrupoTransacao[] {
        return AgruparTransacoes.comDTO(transacoes.map((t) => t.props))
    }

    static comDTO(transacoes: TransacaoProps[]): GrupoTransacao[] {
        if (transacoes.length === 0) return []
        const data = transacoes[0]!.data
        return transacoes
            .reduce((grupos, transacao) => {
                const agruparPor = transacao.agruparPor ?? ''
                const outrosGrupos = grupos.filter((g) => g.nome !== agruparPor)
                const grupo = grupos.find((g) => g.nome === agruparPor)

                const transacoes = [...(grupo?.transacoes ?? []), transacao]
                const novoGrupo: GrupoTransacao = {
                    nome: agruparPor,
                    sumario: GerarSumario.com(data, transacoes).props,
                    transacoes,
                }
                return [...outrosGrupos, novoGrupo]
            }, [] as GrupoTransacao[])
            .sort((a, b) => {
                if (!a.nome) return 1
                if (!b.nome) return -1
                return a.nome.localeCompare(b.nome)
            })
    }
}
