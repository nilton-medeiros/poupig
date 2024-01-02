import { UsuarioProps } from '../../usuario'
import Cartao from '../model/Cartao'
import Id from '../../shared/types/Id'
import Resultado from '../../shared/base/Resultado'

export default interface RepositorioCartao {
    salvar(usuario: UsuarioProps, cartao: Cartao): Promise<Resultado<void>>
    salvarTodos(usuario: UsuarioProps, cartoes: Cartao[]): Promise<Resultado<void>>
    consultar(usuario: UsuarioProps): Promise<Resultado<Cartao[]>>
    excluir(usuario: UsuarioProps, cartaoId: Id): Promise<Resultado<void>>
}
