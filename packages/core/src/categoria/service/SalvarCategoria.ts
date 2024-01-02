import { UsuarioProps } from '../../usuario'
import CasoDeUso from '../../shared/base/CasoDeUso'
import Categoria, { CategoriaProps } from '../model/Categoria'
import RepositorioCategoria from '../provider/RepositorioCategoria'
import Resultado from '../../shared/base/Resultado'

export default class SalvarCategoria implements CasoDeUso<CategoriaProps, void> {
    constructor(private repo: RepositorioCategoria) {}

    async executar(categoria: CategoriaProps, usuario: UsuarioProps): Promise<Resultado<void>> {
        const criarCategoria = Categoria.nova(categoria)
        if (criarCategoria.deuErrado) return criarCategoria.comoFalha
        return this.repo.salvar(usuario, criarCategoria.instancia)
    }
}
