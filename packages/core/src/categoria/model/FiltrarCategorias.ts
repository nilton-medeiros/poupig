import { CategoriaProps } from './Categoria'

export default class FiltrarCategorias {
    constructor(private categorias: CategoriaProps[]) {}

    filtrar(pesquisa: string): CategoriaProps[] {
        return this.categorias.reduce((filtradas: CategoriaProps[], cat: CategoriaProps) => {
            const encontrou = cat.nome!.toLowerCase().includes(pesquisa.toLowerCase())
            const filhos =
                cat.subcategorias?.filter((sub) => {
                    return sub.nome!.toLowerCase().includes(pesquisa.toLowerCase())
                }) ?? []
            const novaCat = { ...cat, subcategorias: filhos }
            return encontrou || filhos.length ? [...filtradas, novaCat] : filtradas
        }, [])
    }
}
