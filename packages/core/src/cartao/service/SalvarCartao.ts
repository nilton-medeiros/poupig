import { UsuarioProps } from '../../usuario'
import Cartao, { CartaoProps } from '../model/Cartao'
import CasoDeUso from '../../shared/base/CasoDeUso'
import RepositorioCartao from '../provider/RepositorioCartao'
import Resultado from '../../shared/base/Resultado'

export default class SalvarCartao implements CasoDeUso<CartaoProps, void> {
    constructor(private repo: RepositorioCartao) {}

    async executar(cartao: CartaoProps, usuario: UsuarioProps): Promise<Resultado<void>> {
        const criarCartao = Cartao.novo(cartao)
        if (criarCartao.deuErrado) return criarCartao.comoFalha
        return this.repo.salvar(usuario, criarCartao.instancia)
    }
}
