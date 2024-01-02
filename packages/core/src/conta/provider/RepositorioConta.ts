import { UsuarioProps } from '../../usuario'
import Conta from '../model/Conta'
import Id from '../../shared/types/Id'
import Resultado from '../../shared/base/Resultado'

export default interface RepositorioConta {
    salvar(usuario: UsuarioProps, conta: Conta): Promise<Resultado<void>>
    salvarTodas(usuario: UsuarioProps, contas: Conta[]): Promise<Resultado<void>>
    consultar(usuario: UsuarioProps): Promise<Resultado<Conta[]>>
    excluir(usuario: UsuarioProps, contaId: Id): Promise<Resultado<void>>
}
