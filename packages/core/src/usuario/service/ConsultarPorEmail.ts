import { UsuarioProps } from '..'
import CasoDeUso from '../../shared/base/CasoDeUso'
import RepositorioUsuario from '../provider/RepositorioUsuario'
import Resultado from '../../shared/base/Resultado'

export default class ConsultarPorEmail implements CasoDeUso<string, UsuarioProps | null> {
    constructor(private repo: RepositorioUsuario) {}

    async executar(email: string): Promise<Resultado<UsuarioProps | null>> {
        const consultar = await this.repo.consultarPorEmail(email)
        if (consultar.deuErrado) return consultar.comoFalha

        const usuario = consultar.instancia
        return Resultado.ok(usuario?.props ?? null)
    }
}
