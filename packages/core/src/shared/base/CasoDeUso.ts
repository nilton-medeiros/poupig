import { UsuarioProps } from '../../usuario'
import Resultado from './Resultado'

export default interface CasoDeUso<IN, OUT> {
    executar(dados: IN, usuario?: UsuarioProps): Promise<Resultado<OUT>>
}
