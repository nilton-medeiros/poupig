import {
    ExtratoProps,
    GrupoTransacao,
    SumarioProps,
    TransacaoProps,
} from '../../../src/extrato/index'
import { IdUnico } from '../../../src'
import Extrato from '../../../src/extrato/model/Extrato'
import Resultado from '../../../src/shared/base/Resultado'
import SumarioBuilder from './SumarioBuilder'
import TransacaoBuilder from './TransacaoBuilder'

export default class ExtratoBuilder {
    private props: Partial<ExtratoProps> = {
        id: IdUnico.gerar(),
        data: new Date(),
        sumario: SumarioBuilder.criar().toProps(),
        transacoes: [TransacaoBuilder.criar().toProps()],
        grupos: [
            {
                nome: 'teste',
                sumario: SumarioBuilder.criar().toProps(),
                transacoes: [TransacaoBuilder.criar().toProps()],
            },
        ],
    }

    static criar(): ExtratoBuilder {
        return new ExtratoBuilder()
    }

    comData(data: Date): ExtratoBuilder {
        this.props.data = data
        return this
    }

    semData(): ExtratoBuilder {
        this.props.data = undefined
        return this
    }

    comSumario(sumario: SumarioProps): ExtratoBuilder {
        this.props.sumario = sumario
        return this
    }

    semSumario(): ExtratoBuilder {
        this.props.sumario = undefined
        return this
    }

    comTransacoes(transacoes: TransacaoProps[]): ExtratoBuilder {
        this.props.transacoes = transacoes
        return this
    }

    semTransacoes(): ExtratoBuilder {
        this.props.transacoes = undefined
        return this
    }

    comGrupos(grupos: GrupoTransacao[]): ExtratoBuilder {
        this.props.grupos = grupos
        return this
    }

    semGrupos(): ExtratoBuilder {
        this.props.grupos = undefined
        return this
    }

    build(): Resultado<Extrato> {
        return Extrato.novo(this.props as ExtratoProps)
    }

    toProps(): ExtratoProps {
        return this.props as ExtratoProps
    }
}
