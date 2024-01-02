import { UsuarioProps } from '../../usuario'
import AnoMesId from '../../shared/types/AnoMesId'
import Extrato from '../model/Extrato'
import Resultado from '../../shared/base/Resultado'
import Recorrencia from '../model/Recorrencia'

export default interface RepositorioExtrato {
    salvar(usuario: UsuarioProps, extrato: Extrato): Promise<Resultado<void>>
    salvarTodos(usuario: UsuarioProps, extratos: Extrato[]): Promise<Resultado<void>>
    salvarRecorrencia(
        usuario: UsuarioProps,
        extratos: Extrato[],
        recorrencia: Recorrencia
    ): Promise<Resultado<void>>

    consultar(usuario: UsuarioProps): Promise<Resultado<Extrato[]>>
    consultarPorId(usuario: UsuarioProps, id: AnoMesId): Promise<Resultado<Extrato | null>>
    consultarPorIds(usuario: UsuarioProps, ids: AnoMesId[]): Promise<Resultado<Extrato[]>>

    consultarRecorrencias(usuario: UsuarioProps): Promise<Resultado<Recorrencia[]>>
    consultarRecorrenciasPorMes(
        usuario: UsuarioProps,
        data: Date
    ): Promise<Resultado<Recorrencia[]>>
    consultarRecorrenciaPorId(
        usuario: UsuarioProps,
        id: string
    ): Promise<Resultado<Recorrencia | null>>

    excluirRecorrencia(
        usuario: UsuarioProps,
        extratos: Extrato[],
        recorrencia: Recorrencia
    ): Promise<Resultado<void>>
}
