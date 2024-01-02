import { CategoriaProps } from '../../categoria'
import FiltroTransacao from './FiltroTransacao'

export default {
    id: 'AgruparPorCategoria',
    aplicar: (categorias: CategoriaProps[]) => (transacoes) =>
        transacoes.map((transacao) => {
            const porId = (categoria: CategoriaProps) => categoria.id === transacao.categoriaId
            const categoria = categorias.find(porId)
            const agruparPor = categoria?.pai?.nome ?? categoria?.nome ?? transacao.categoriaId
            return { ...transacao, agruparPor }
        }),
} as FiltroTransacao
