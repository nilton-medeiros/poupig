import { RecorrenciaProps } from '..'
import { UsuarioProps } from '../../usuario'
import CasoDeUso from '../../shared/base/CasoDeUso'
import RepositorioExtrato from '../provider/RepositorioExtrato'
import Resultado from '../../shared/base/Resultado'

export default class ConsultarRecorrencias implements CasoDeUso<UsuarioProps, RecorrenciaProps[]> {
    constructor(private repo: RepositorioExtrato) {}

    async executar(usuario: UsuarioProps): Promise<Resultado<RecorrenciaProps[]>> {
        const consultar = await this.repo.consultarRecorrencias(usuario)
        if (consultar.deuErrado) return consultar.comoFalha

        const recorrencias = consultar.instancia
        const props = recorrencias.map((r) => r.props)
        return Resultado.ok(props)
    }
}
