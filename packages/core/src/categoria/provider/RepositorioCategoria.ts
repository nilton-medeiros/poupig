import { UsuarioProps } from '../../usuario'
import Categoria from '../model/Categoria'
import Id from '../../shared/types/Id'
import Resultado from '../../shared/base/Resultado'

export default interface RepositorioCategoria {
    salvar(usuario: UsuarioProps, categoria: Categoria): Promise<Resultado<void>>
    salvarTodas(usuario: UsuarioProps, categorias: Categoria[]): Promise<Resultado<void>>
    consultar(usuario: UsuarioProps): Promise<Resultado<Categoria[]>>
    excluir(usuario: UsuarioProps, categoriaId: Id): Promise<Resultado<void>>
}
