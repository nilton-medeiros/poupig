import Resultado from '../../shared/base/Resultado'
import Categoria from './Categoria'

export default class RelacionarCategorias {
    constructor(private categorias: Categoria[]) {}

    executar(): Resultado<Categoria[]> {
        const categorias = this.categorias
            .map((categoria) => {
                const pai = this.categorias.find((c) => c.id.valor === categoria.idPai?.valor)
                const subcategorias = this.categorias
                    .filter((c) => c.idPai?.valor === categoria.id.valor)
                    .map(
                        (s) =>
                            Categoria.nova({
                                ...s.props,
                                pai: categoria.props,
                            }).instancia
                    )

                if (categoria.idPai) return Resultado.nulo()

                return Categoria.nova({
                    ...categoria.props,
                    pai: pai ? pai.props : null,
                    subcategorias: subcategorias.map((s) => s.props),
                })
            })
            .filter((c) => c.deuErrado || c.instancia)
        return Resultado.combinar(categorias) as Resultado<Categoria[]>
    }
}
