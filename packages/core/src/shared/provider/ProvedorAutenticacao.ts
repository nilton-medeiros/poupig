import { UsuarioProps } from '../../usuario'

export type MonitorarAut = (usuario: UsuarioProps | null) => void
export type PararMonitoramentoAut = () => void

export default interface ProvedorAutenticacao {
    loginComProvedor(providerId: string): Promise<UsuarioProps | null>
    logout(): Promise<void>
    monitorar(fn: MonitorarAut): PararMonitoramentoAut
}
