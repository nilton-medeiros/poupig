import { fn } from 'utils'
import AnoMesId from '../../shared/types/AnoMesId'
import Entidade, { EntidadeProps } from '../../shared/base/Entidade'
import Resultado from '../../shared/base/Resultado'

export interface FaturaProps extends EntidadeProps {
    data?: Date
    valor?: number
    valorPlanejado?: number
}

export default class Fatura extends Entidade<Fatura, FaturaProps> {
    private constructor(
        readonly id: AnoMesId,
        readonly data: Date,
        readonly valor: number,
        readonly valorPlanejado: number,
        readonly props: FaturaProps
    ) {
        super(id)
    }

    static novas(props: FaturaProps[]): Resultado<Fatura[]> {
        return Resultado.combinar(props?.map(Fatura.nova) ?? [])
    }

    static nova(props: FaturaProps): Resultado<Fatura> {
        const gerarId = AnoMesId.novo(props.data!)
        if (gerarId.deuErrado) return gerarId.comoFalha

        const id = gerarId.instancia

        const propsCompleto: Required<FaturaProps> = {
            id: id.valor,
            data: props.data!,
            valor: props.valor ?? 0,
            valorPlanejado: props.valorPlanejado ?? 0,
        }

        return Resultado.ok(
            new Fatura(
                id,
                propsCompleto.data,
                propsCompleto.valor,
                propsCompleto.valorPlanejado,
                fn.obj.manterAtribs(propsCompleto, ['id', 'data', 'valor', 'valorPlanejado'])
            )
        )
    }
}
