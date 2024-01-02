import CasoDeUso from '../../shared/base/CasoDeUso'
import RepositorioUsuario from '../provider/RepositorioUsuario'
import Resultado from '../../shared/base/Resultado'
import Usuario, { UsuarioProps } from '../model/Usuario'

export default class SalvarUsuario implements CasoDeUso<UsuarioProps, void> {
    constructor(private repo: RepositorioUsuario) {}

    async executar(props: UsuarioProps): Promise<Resultado<void>> {
        const criarUsuario = Usuario.novo(props)
        if (criarUsuario.deuErrado) return criarUsuario.comoFalha

        const usuario = criarUsuario.instancia
        return this.repo.salvar(usuario)
    }
}
