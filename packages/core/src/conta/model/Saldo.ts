import { fn } from 'utils'
import AnoMesId from '../../shared/types/AnoMesId'
import Entidade, { EntidadeProps } from '../../shared/base/Entidade'
import Resultado from '../../shared/base/Resultado'

export interface SaldoProps extends EntidadeProps {
    data: Date
    acumulado: number
    creditos: number
    debitos: number
}

export default class Saldo extends Entidade<Saldo, SaldoProps> {
    private constructor(
        readonly id: AnoMesId,
        readonly data: Date,
        readonly acumulado: number,
        readonly creditos: number,
        readonly debitos: number,
        readonly props: SaldoProps
    ) {
        super(id)
    }

    static novos(props: SaldoProps[]): Resultado<Saldo[]> {
        return Resultado.combinar(props.map(Saldo.novo) ?? [])
    }

    static vazio(data: Date): Resultado<Saldo> {
        return Saldo.novo({ data, acumulado: 0, creditos: 0, debitos: 0 })
    }

    static novo(props: SaldoProps): Resultado<Saldo> {
        const id = AnoMesId.novo(props.data)
        return Resultado.ok(
            new Saldo(
                id.instancia,
                props.data,
                props.acumulado,
                props.creditos,
                props.debitos,
                fn.obj.manterAtribs(props, ['id', 'data', 'acumulado', 'creditos', 'debitos'])
            )
        )
    }
}
