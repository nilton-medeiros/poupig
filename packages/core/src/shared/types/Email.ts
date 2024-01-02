import { Validador } from 'utils'
import Resultado from '../base/Resultado'
import TipoErro from './TipoErro'
import VO, { VOConfig } from '../base/VO'

export default class Email extends VO<string, VOConfig> {
    private constructor(
        readonly valor: string,
        readonly cfg?: VOConfig
    ) {
        super(valor, cfg)
    }

    static novo(valor?: string, cfg?: VOConfig): Resultado<Email> {
        const { cls, atr } = cfg ?? {}
        const erro =
            Validador.naoNulo(TipoErro.EMAIL_NULO, valor) ||
            Validador.email(TipoErro.EMAIL_INVALIDO, valor!)

        return erro
            ? Resultado.falha<Email>({ tipo: erro, valor, cls, atr })
            : Resultado.ok(new Email(valor!))
    }
}
