import { MonitorarAut, PararMonitoramentoAut, ProvedorAutenticacao, UsuarioProps } from '../../src'
import Dados from '../data/bases/Dados'
import Resultado from '../../src/shared/base/Resultado'
import Usuario from '../../src/usuario/model/Usuario'
import UsuarioBuilder from '../data/UsuarioBuilder'

export default class ColecaoAutenticacaoMemoria implements ProvedorAutenticacao {
    private usuarios: Resultado<Usuario>[] = [
        Usuario.novo({
            id: Dados.id.aleatorio(),
            nome: Dados.nome.usuario(),
            email: Dados.email.especifico(),
            config: {
                esconderSumarios: false,
                esconderValores: false,
                menuMini: false,
                exibirFiltros: false,
                filtros: [Dados.texto.geradorCaracteres(3), Dados.texto.geradorCaracteres(3)],
            },
        }),
        Usuario.novo({
            id: Dados.id.aleatorio(),
            nome: Dados.nome.usuario(),
            email: Dados.email.especifico(0),
            provider: 'google',
            config: {
                esconderSumarios: false,
                esconderValores: false,
                menuMini: false,
                exibirFiltros: false,
                filtros: [Dados.texto.geradorCaracteres(3), Dados.texto.geradorCaracteres(3)],
            },
        }),
    ]

    async loginComProvedor(providerId: string): Promise<UsuarioProps | null> {
        const usuario = this.usuarios.find((u) => u.instancia?.props.provider === providerId)
            ?.instancia?.props

        return usuario ?? null
    }

    async logout(): Promise<void> {
        UsuarioBuilder.criar().semEmail().semId().build()
    }

    monitorar(fn: MonitorarAut): PararMonitoramentoAut {
        return () => {
            return fn(UsuarioBuilder.criar().comId('teste').comEmail('teste@gmail.com').toProps())
        }
    }
}
