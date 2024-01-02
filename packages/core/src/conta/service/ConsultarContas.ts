import { ContaProps } from '..'
import { UsuarioProps } from '../../usuario'
import CasoDeUso from '../../shared/base/CasoDeUso'
import RepositorioConta from '../provider/RepositorioConta'
import Resultado from '../../shared/base/Resultado'

export default class ConsultarContas implements CasoDeUso<UsuarioProps, ContaProps[]> {
    constructor(private repo: RepositorioConta) {}

    async executar(usuario: UsuarioProps): Promise<Resultado<ContaProps[]>> {
        const consultar = await this.repo.consultar(usuario)
        if (consultar.deuErrado) return consultar.comoFalha

        const contas = consultar.instancia
        const props = contas.map((c) => c.props)
        return Resultado.ok(props)
    }
}
