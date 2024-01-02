import { UsuarioProps } from '../../src'
import Cartao from '../../src/cartao/model/Cartao'
import CartaoBuilder from '../data/CartaoBuilder'
import Id from '../../src/shared/types/Id'
import RepositorioCartao from '../../src/cartao/provider/RepositorioCartao'
import Resultado from '../../src/shared/base/Resultado'
import UsuarioBuilder from '../data/UsuarioBuilder'

interface ColecaoCartaoMemoriaProps {
    cartoes: Cartao[]
    usuario: UsuarioProps
}

export default class ColecaoCartaoMemoria implements RepositorioCartao {
    private usuarios: ColecaoCartaoMemoriaProps[] = [
        {
            cartoes: [
                Cartao.novo(
                    CartaoBuilder.criar().comDescricao('Conta 2').comBandeira('VISA').toProps()
                ).instancia,
                Cartao.novo(
                    CartaoBuilder.criar().comDescricao('Conta 2').comBandeira('MASTERCARD').toProps()
                ).instancia,
            ],
            usuario: UsuarioBuilder.criar().toProps(),
        },
    ]

    async salvar(usuario: UsuarioProps, cartao: Cartao): Promise<Resultado<void>> {
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.usuarios.find((u) => u.usuario.email === usuario.email)
            if (usuarioEncontrado) {
                usuarioEncontrado.cartoes.push(cartao)
            }
            return Resultado.ok()
        })
    }

    async salvarTodos(usuario: UsuarioProps, cartoes: Cartao[]): Promise<Resultado<void>> {
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.usuarios.find((u) => u.usuario.email === usuario.email)
            if (usuarioEncontrado) {
                usuarioEncontrado.cartoes.push(...cartoes)
            }
            return Resultado.ok()
        })
    }

    async consultar(usuario: UsuarioProps): Promise<Resultado<Cartao[]>> {
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.usuarios.find((u) => u.usuario.email === usuario.email)
            if (usuarioEncontrado) {
                return Resultado.ok(usuarioEncontrado.cartoes)
            }
            return Resultado.ok([])
        })
    }

    async excluir(usuario: UsuarioProps, cartaoId: Id): Promise<Resultado<void>> {
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.usuarios.find((u) => u.usuario.email === usuario.email)
            if (usuarioEncontrado) {
                usuarioEncontrado.cartoes = usuarioEncontrado.cartoes.filter(
                    (c) => c.id.valor !== cartaoId.valor
                )
            }
            return Resultado.ok()
        })
    }
}
