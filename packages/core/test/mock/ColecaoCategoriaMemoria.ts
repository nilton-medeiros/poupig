import { UsuarioProps } from '../../src'
import Categoria from '../../src/categoria/model/Categoria'
import Id from '../../src/shared/types/Id'
import RepositorioCategoria from '../../src/categoria/provider/RepositorioCategoria'
import Resultado from '../../src/shared/base/Resultado'
import UsuarioBuilder from '../data/UsuarioBuilder'

interface ColecaoCategoriaMemoriaProps {
    categorias: Categoria[]
    usuario: UsuarioProps
}

export default class ColecaoCategoriaMemoria implements RepositorioCategoria {
    private usuarios: ColecaoCategoriaMemoriaProps[] = [
        {
            categorias: [],
            usuario: UsuarioBuilder.criar().toProps(),
        },
    ]

    async salvar(usuario: UsuarioProps, categoria: Categoria): Promise<Resultado<void>> {
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.usuarios.find((u) => u.usuario.email === usuario.email)
            if (usuarioEncontrado) {
                usuarioEncontrado.categorias.push(categoria)
            }
            return Resultado.ok()
        })
    }

    async salvarTodas(usuario: UsuarioProps, categorias: Categoria[]): Promise<Resultado<void>> {
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.usuarios.find((u) => u.usuario.email === usuario.email)
            if (usuarioEncontrado) {
                usuarioEncontrado.categorias.push(...categorias)
            }
            return Resultado.ok()
        })
    }

    async excluir(usuario: UsuarioProps, categoriaId: Id): Promise<Resultado<void>> {
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.usuarios.find((u) => u.usuario.email === usuario.email)
            if (usuarioEncontrado) {
                usuarioEncontrado.categorias = usuarioEncontrado.categorias.filter(
                    (c) => c.id.valor !== categoriaId.valor
                )
            }
            return Resultado.ok()
        })
    }

    async consultar(usuario: UsuarioProps): Promise<Resultado<Categoria[]>> {
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.usuarios.find((u) => u.usuario.email === usuario.email)
            if (usuarioEncontrado) {
                return Resultado.ok(usuarioEncontrado.categorias)
            }
            return Resultado.ok([])
        })
    }
}
