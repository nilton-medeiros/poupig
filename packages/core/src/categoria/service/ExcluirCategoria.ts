import { CategoriaProps } from '..'
import { UsuarioProps } from '../../usuario'
import CasoDeUso from '../../shared/base/CasoDeUso'
import Id from '../../shared/types/Id'
import RepositorioCategoria from '../provider/RepositorioCategoria'
import Resultado from '../../shared/base/Resultado'

export default class ExcluirCategoria implements CasoDeUso<CategoriaProps, void> {
    constructor(private repo: RepositorioCategoria) {}

    async executar(categoria: CategoriaProps, usuario: UsuarioProps): Promise<Resultado<void>> {
        const criarId = Id.novo(categoria.id)
        if (criarId.deuErrado) return criarId.comoFalha

        return this.repo.excluir(usuario, criarId.instancia)
    }
}
