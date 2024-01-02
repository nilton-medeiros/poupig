import { ProvedorAutenticacao } from '../../shared'
import CasoDeUso from '../../shared/base/CasoDeUso'
import RepositorioUsuario from '../provider/RepositorioUsuario'
import Resultado from '../../shared/base/Resultado'
import Usuario, { UsuarioProps } from '../model/Usuario'

export default class LoginComProvedor implements CasoDeUso<string, UsuarioProps | null> {
    constructor(
        private auth: ProvedorAutenticacao,
        private repo: RepositorioUsuario
    ) {}

    async executar(provedorId: string): Promise<Resultado<UsuarioProps | null>> {
        const usuarioAuth = await this.auth.loginComProvedor?.(provedorId)
        const usuarioSinc = await this._sincronizarUsuario(usuarioAuth)
        if (usuarioSinc.deuErrado) return usuarioSinc.comoFalha
        return Resultado.ok(usuarioSinc.instancia)
    }

    private async _sincronizarUsuario(
        usuarioAuth?: UsuarioProps | null
    ): Promise<Resultado<UsuarioProps | null>> {
        if (!usuarioAuth || !usuarioAuth.email) return Resultado.nulo()

        const consultar = await this.repo.consultarPorEmail(usuarioAuth.email)
        if (consultar.deuErrado) return consultar.comoFalha

        const usuarioExistente = consultar.instancia
        const novoUsuario = usuarioExistente
            ? Resultado.ok(usuarioExistente)
            : Usuario.novo(usuarioAuth)
        if (novoUsuario.deuErrado) return novoUsuario.comoFalha

        const usuario = novoUsuario.instancia
        if (!usuarioExistente) await this.repo.salvar(usuario)
        return Resultado.ok(usuario.props)
    }
}
