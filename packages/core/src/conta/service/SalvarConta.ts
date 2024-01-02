import { UsuarioProps } from '../../usuario'
import CasoDeUso from '../../shared/base/CasoDeUso'
import Conta, { ContaProps } from '../model/Conta'
import RepositorioConta from '../provider/RepositorioConta'
import Resultado from '../../shared/base/Resultado'

export default class SalvarConta implements CasoDeUso<ContaProps, void> {
    constructor(private repo: RepositorioConta) {}

    async executar(conta: ContaProps, usuario: UsuarioProps): Promise<Resultado<void>> {
        const criarConta = Conta.nova(conta)
        if (criarConta.deuErrado) return criarConta.comoFalha
        return this.repo.salvar(usuario, criarConta.instancia)
    }
}
