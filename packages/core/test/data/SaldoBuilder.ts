import { AnoMesId, SaldoProps } from '../../src'
import Resultado from '../../src/shared/base/Resultado'
import Saldo from '../../src/conta/model/Saldo'

export default class SaldoBuilder {
    private props: Partial<SaldoProps> = {
        id: AnoMesId.novo(new Date()).instancia.valor,
        data: new Date(),
        valor: 0,
        acumulado: 0,
    }

    static criar(): SaldoBuilder {
        return new SaldoBuilder()
    }

    comData(dt: Date): SaldoBuilder {
        this.props.id = AnoMesId.novo(dt).instancia.valor
        this.props.data = dt
        return this
    }

    comValor(valor: number): SaldoBuilder {
        this.props.valor = valor
        return this
    }

    comAcumulado(acumulado: number): SaldoBuilder {
        this.props.acumulado! += acumulado
        return this
    }

    build(): Resultado<Saldo> {
        return Saldo.novo(this.props as SaldoProps)
    }

    toProps(): SaldoProps {
        return this.props as SaldoProps
    }
}
