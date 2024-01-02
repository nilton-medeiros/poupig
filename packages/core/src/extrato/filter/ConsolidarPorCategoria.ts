import { CategoriaProps } from '../../categoria'
import { fn, IdUnico } from 'utils'
import { TransacaoProps } from '..'
import { Utils } from './utils'
import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'ConsolidarPorCategoria',
    aplicar: (categorias: CategoriaProps[]) => (transacoes) => {
        const primarias = categorias.filter((c) => !c.idPai)
        const consolidadas = primarias
            .map((categoria) => {
                const selecionadas = _transacoesDaCategoria(categoria, transacoes)
                if (selecionadas.length === 0) return null

                return {
                    id: IdUnico.gerar(),
                    nome: categoria.nome,
                    data: fn.dt.min(...selecionadas.map((t) => t.data)),
                    ...Utils.valorEOperacao(selecionadas),
                    virtual: true,
                    categoriaId: categoria.id,
                    consolidada: false,
                } as TransacaoProps
            })
            .filter((c) => c)

        return consolidadas.concat(transacoes?.filter((t) => t.categoriaId == null))
    },
} as FiltroTransacao

function _transacoesDaCategoria(
    categoria: CategoriaProps,
    transacoes: TransacaoProps[]
): TransacaoProps[] {
    return transacoes.filter((t) => {
        const procurado = t.categoriaId
        const primaria = procurado === categoria.id
        const secundaria = categoria.subcategorias?.find((s) => s.id === procurado)
        return primaria || secundaria
    })
}
