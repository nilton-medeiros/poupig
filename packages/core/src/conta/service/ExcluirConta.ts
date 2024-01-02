import { ContaProps } from '..'
import { UsuarioProps } from '../../usuario'
import CasoDeUso from '../../shared/base/CasoDeUso'
import Id from '../../shared/types/Id'
import RepositorioConta from '../provider/RepositorioConta'
import Resultado from '../../shared/base/Resultado'

export default class ExcluirConta implements CasoDeUso<ContaProps, void> {
    constructor(private repo: RepositorioConta) {}

    async executar(conta: ContaProps, usuario: UsuarioProps): Promise<Resultado<void>> {
        const criarId = Id.novo(conta.id)
        if (criarId.deuErrado) return criarId.comoFalha
        return this.repo.excluir(usuario, criarId.instancia)
    }
}
