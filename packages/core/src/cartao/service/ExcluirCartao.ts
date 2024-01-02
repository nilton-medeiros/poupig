import { CartaoProps } from '..'
import { UsuarioProps } from '../../usuario'
import CasoDeUso from '../../shared/base/CasoDeUso'
import Id from '../../shared/types/Id'
import RepositorioCartao from '../provider/RepositorioCartao'
import Resultado from '../../shared/base/Resultado'

export default class ExcluirCartao implements CasoDeUso<CartaoProps, void> {
    constructor(private repo: RepositorioCartao) {}

    async executar(cartao: CartaoProps, usuario: UsuarioProps): Promise<Resultado<void>> {
        const criarId = Id.novo(cartao.id)
        if (criarId.deuErrado) return criarId.comoFalha
        return this.repo.excluir(usuario, criarId.instancia)
    }
}
