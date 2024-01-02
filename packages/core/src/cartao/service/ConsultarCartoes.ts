import { CartaoProps } from '..'
import { UsuarioProps } from '../../usuario'
import CasoDeUso from '../../shared/base/CasoDeUso'
import RepositorioCartao from '../provider/RepositorioCartao'
import Resultado from '../../shared/base/Resultado'

export default class ConsultarCartoes implements CasoDeUso<UsuarioProps, CartaoProps[]> {
    constructor(private repo: RepositorioCartao) {}

    async executar(usuario: UsuarioProps): Promise<Resultado<CartaoProps[]>> {
        const resultado = await this.repo.consultar(usuario)
        if (resultado.deuErrado) return resultado.comoFalha

        const cartoes = resultado.instancia
        const props = cartoes.map((c) => c.props)
        return Resultado.ok(props)
    }
}
