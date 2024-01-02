import { AnoMesId, UsuarioProps } from '../../src'
import Extrato from '../../src/extrato/model/Extrato'
import ExtratoBuilder from '../data/extrato/ExtratoBuilder'
import Recorrencia from '../../src/extrato/model/Recorrencia'
import RecorrenciaBuilder from '../data/RecorrenciaBuilder'
import RepositorioExtrato from '../../src/extrato/provider/RepositorioExtrato'
import Resultado from '../../src/shared/base/Resultado'
import TransacaoBuilder from '../data/extrato/TransacaoBuilder'
import UsuarioBuilder from '../data/UsuarioBuilder'

interface ColecaoExtratoMemoriaProps {
    extratos: Extrato[]
    recorrencias: Recorrencia[]
    usuario: UsuarioProps
}

export default class ColecaoExtratoMemoria implements RepositorioExtrato {
    private usuarios: ColecaoExtratoMemoriaProps[] = [
        {
            extratos: [
                ExtratoBuilder.criar()
                    .comTransacoes([
                        TransacaoBuilder.criar()
                            .comId('123')
                            .comRecorrenciaId('123')
                            .comNome('Transação 1')
                            .toProps(),
                    ])
                    .build().instancia,
                ExtratoBuilder.criar()
                    .comTransacoes([
                        TransacaoBuilder.criar()
                            .comId('321')
                            .comRecorrenciaId('321')
                            .comNome('Transação 2')
                            .toProps(),
                    ])
                    .build().instancia,
            ],
            recorrencias: [
                RecorrenciaBuilder.criar().comId('123').build().instancia,
                RecorrenciaBuilder.criar().comId('321').build().instancia,
            ],
            usuario: UsuarioBuilder.criar().toProps(),
        },
    ]

    salvar(usuario: UsuarioProps, extrato: Extrato): Promise<Resultado<void>> {
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.usuarios.find((u) => u.usuario.id === usuario.id)
            if (!usuarioEncontrado) {
                this.usuarios.push({
                    extratos: [extrato],
                    usuario,
                    recorrencias: [],
                })
            } else {
                usuarioEncontrado.extratos.push(extrato)
            }
            return Resultado.ok()
        })
    }
    salvarTodos(usuario: UsuarioProps, extratos: Extrato[]): Promise<Resultado<void>> {
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.usuarios.find((u) => u.usuario.id === usuario.id)
            if (!usuarioEncontrado) {
                this.usuarios.push({
                    extratos,
                    usuario,
                    recorrencias: [],
                })
            } else {
                usuarioEncontrado.extratos.push(...extratos)
            }
            return Resultado.ok()
        })
    }
    salvarRecorrencia(
        usuario: UsuarioProps,
        extratos: Extrato[],
        recorrencia: Recorrencia
    ): Promise<Resultado<void>> {
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.usuarios.find((u) => u.usuario.id === usuario.id)
            if (!usuarioEncontrado) {
                this.usuarios.push({
                    extratos,
                    usuario,
                    recorrencias: [recorrencia],
                })
            } else {
                usuarioEncontrado.extratos.push(
                    ExtratoBuilder.criar()
                        .comTransacoes([
                            TransacaoBuilder.criar()
                                .comRecorrenciaId(recorrencia.id.valor)
                                .toProps(),
                        ])
                        .build().instancia
                )
                usuarioEncontrado.extratos.push(...extratos)
            }
            return Resultado.ok()
        })
    }
    consultar(usuario: UsuarioProps): Promise<Resultado<Extrato[]>> {
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.usuarios.find((u) => u.usuario.email === usuario.email)
            if (usuarioEncontrado) {
                return Resultado.ok(usuarioEncontrado.extratos)
            }
            return Resultado.ok([])
        })
    }
    consultarPorId(usuario: UsuarioProps, id: AnoMesId): Promise<Resultado<Extrato | null>> {
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.usuarios.find((u) => u.usuario.email === usuario.email)
            if (usuarioEncontrado) {
                const extratoEncontrado = usuarioEncontrado.extratos.find(
                    (e) => e.id.valor === id.valor
                )
                return Resultado.ok(extratoEncontrado)
            }
            return Resultado.ok(null)
        })
    }
    consultarPorIds(usuario: UsuarioProps, ids: AnoMesId[]): Promise<Resultado<Extrato[]>> {
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.usuarios.find((u) => u.usuario.email === usuario.email)
            if (usuarioEncontrado) {
                const extratosEncontrados = usuarioEncontrado.extratos.filter((e) =>
                    ids.includes(e.id)
                )
                return Resultado.ok(extratosEncontrados)
            }

            return Resultado.ok([])
        })
    }
    consultarRecorrencias(usuario: UsuarioProps): Promise<Resultado<Recorrencia[]>> {
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.usuarios.find((u) => u.usuario.email === usuario.email)
            if (usuarioEncontrado) {
                return Resultado.ok(
                    usuarioEncontrado.extratos
                        .map((e) => e.transacoes)
                        .flat()
                        .filter((t) => t.recorrenciaId)
                        .map((r) => {
                            const paraProps = RecorrenciaBuilder.criar()
                                .comId(r.recorrenciaId!)
                                .toProps()

                            return Recorrencia.nova(paraProps).instancia
                        })
                )
            }
            return Resultado.ok([])
        })
    }
    consultarRecorrenciasPorMes(
        usuario: UsuarioProps,
        data: Date
    ): Promise<Resultado<Recorrencia[]>> {
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.usuarios.find((u) => u.usuario.email === usuario.email)
            if (usuarioEncontrado) {
                const recorrencias = usuarioEncontrado.recorrencias.filter((e) => {
                    if (e.dataFim) {
                        return data >= e.transacao.data && data <= e.dataFim
                    } else {
                        return e.transacao.data === data
                    }
                })
                return Resultado.ok(recorrencias)
            }
            return Resultado.ok([])
        })
    }

    consultarRecorrenciaPorId(
        usuario: UsuarioProps,
        id: string
    ): Promise<Resultado<Recorrencia | null>> {
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.usuarios.find((u) => u.usuario.email === usuario.email)
            if (usuarioEncontrado) {
                const recorrenciaEncontrada = usuarioEncontrado.recorrencias.find((r) => {
                    return r.id.valor === id
                })
                return Resultado.ok(recorrenciaEncontrada || null)
            }
            return Resultado.ok(null)
        })
    }
    excluirRecorrencia(
        usuario: UsuarioProps,
        extratos: Extrato[],
        recorrencia: Recorrencia
    ): Promise<Resultado<void>> {
        return Resultado.tentar(async () => {
            const usuarioEncontrado = this.usuarios.find((u) => u.usuario.id === usuario.id)
            if (!usuarioEncontrado) {
                this.usuarios.push({
                    extratos,
                    usuario,
                    recorrencias: [recorrencia],
                })
            } else {
                usuarioEncontrado.extratos.push(
                    ExtratoBuilder.criar()
                        .comTransacoes([
                            TransacaoBuilder.criar()
                                .comRecorrenciaId(recorrencia.id.valor)
                                .toProps(),
                        ])
                        .build().instancia
                )
                usuarioEncontrado.extratos.push(...extratos)
            }
            return Resultado.ok()
        })
    }
}
