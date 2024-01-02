import { UsuarioProps } from '../../usuario'
import CasoDeUso from '../../shared/base/CasoDeUso'
import Categoria, { CategoriaProps } from '../model/Categoria'
import RepositorioCategoria from '../provider/RepositorioCategoria'
import Resultado from '../../shared/base/Resultado'

export default class SalvarCategorias implements CasoDeUso<CategoriaProps[], void> {
    constructor(private repo: RepositorioCategoria) {}

    async executar(categoria: CategoriaProps[], usuario: UsuarioProps): Promise<Resultado<void>> {
        const criarCategorias = Categoria.novas(categoria)
        if (criarCategorias.deuErrado) return criarCategorias.comoFalha

        return this.repo.salvarTodas(usuario, criarCategorias.instancia)
    }
}
