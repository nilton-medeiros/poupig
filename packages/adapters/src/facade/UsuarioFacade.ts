import { UsuarioDTO } from '../dto'
import { RepositorioUsuario, ConsultarPorEmail, SalvarUsuario } from 'core'

export default class UsuarioFacade {
    constructor(readonly repo: RepositorioUsuario) {}

    async salvar(usuario: UsuarioDTO): Promise<void> {
        const casoDeUso = new SalvarUsuario(this.repo)
        const resultado = await casoDeUso.executar(usuario)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
    }

    async consultar(email: string): Promise<UsuarioDTO | null> {
        const casoDeUso = new ConsultarPorEmail(this.repo)
        const resultado = await casoDeUso.executar(email)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
        return resultado.instancia
    }
}
