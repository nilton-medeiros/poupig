import { CategoriaProps } from '../../categoria'
import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'AgruparPorSubcategoria',
    aplicar: (categorias: CategoriaProps[]) => (transacoes) =>
        transacoes.map((transacao) => {
            const porId = (categoria: CategoriaProps) => categoria.id === transacao.categoriaId
            const categoria = categorias.find(porId)
            const nomeCompleto = categoria?.pai
                ? categoria?.pai?.nome + '/' + categoria?.nome
                : categoria?.nome
            const agruparPor = nomeCompleto ?? transacao.categoriaId
            return { ...transacao, agruparPor }
        }),
} as FiltroTransacao
