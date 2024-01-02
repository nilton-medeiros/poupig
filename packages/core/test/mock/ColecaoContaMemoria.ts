import { UsuarioProps } from '../../src'
import Conta from '../../src/conta/model/Conta'
import ContaBuilder from '../data/ContaBuilder'
import Id from '../../src/shared/types/Id'
import RepositorioConta from '../../src/conta/provider/RepositorioConta'
import Resultado from '../../src/shared/base/Resultado'
import SaldoBuilder from '../data/SaldoBuilder'
import UsuarioBuilder from '../data/UsuarioBuilder'

interface ColecaoContaMemoriaProps {
    contas: Conta[]
    usuario: UsuarioProps
}

export default class ColecaoContaMemoria implements RepositorioConta {
    private usuarios: ColecaoContaMemoriaProps[] = [
        {
            contas: [
                ContaBuilder.criar()
                    .comDescricao('Conta 1')
                    .comSaldos([SaldoBuilder.criar().toProps(), SaldoBuilder.criar().toProps()])
                    .build().instancia,
                ContaBuilder.criar()
                    .comDescricao('Conta 2')
                    .comSaldos([SaldoBuilder.criar().toProps(), SaldoBuilder.criar().toProps()])
                    .build().instancia,
            ],
            usuario: UsuarioBuilder.criar().toProps(),
        },
    ]

    async salvar(usuario: UsuarioProps, conta: Conta): Promise<Resultado<void>> {
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.usuarios.find((u) => u.usuario.id === usuario.id)
            if (!usuarioEncontrado) {
                this.usuarios.push({
                    contas: [conta],
                    usuario,
                })
            } else {
                usuarioEncontrado.contas.push(conta)
            }
            return Resultado.ok()
        })
    }

    async salvarTodas(usuario: UsuarioProps, contas: Conta[]): Promise<Resultado<void>> {
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.usuarios.find((u) => u.usuario.id === usuario.id)
            if (!usuarioEncontrado) {
                this.usuarios.push({
                    contas,
                    usuario,
                })
            } else {
                usuarioEncontrado.contas.push(...contas)
            }
            return Resultado.ok()
        })
    }

    async excluir(usuario: UsuarioProps, contaId: Id): Promise<Resultado<void>> {
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.usuarios.find((u) => u.usuario.email === usuario.email)
            if (usuarioEncontrado) {
                usuarioEncontrado.contas = usuarioEncontrado.contas.filter(
                    (c) => c.id.valor !== c.id.valor
                )
            }
            return Resultado.ok()
        })
    }

    async consultar(usuario: UsuarioProps): Promise<Resultado<Conta[]>> {
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.usuarios.find((u) => u.usuario.email === usuario.email)
            if (usuarioEncontrado) {
                return Resultado.ok(usuarioEncontrado.contas)
            }
            return Resultado.ok([])
        })
    }
}
