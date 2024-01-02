import { AnoMesId } from '../../shared'
import { ExtratoProps, TipoOperacao, TransacaoProps } from '../../extrato'
import { FaturaProps } from '..'
import { fn } from 'utils'
import { UsuarioProps } from '../..'
import Cartao from '../model/Cartao'
import CasoDeUso from '../../shared/base/CasoDeUso'
import RepositorioCartao from '../provider/RepositorioCartao'
import Resultado from '../../shared/base/Resultado'

export default class AtualizarFaturas implements CasoDeUso<ExtratoProps[], void> {
    constructor(private repo: RepositorioCartao) {}

    async executar(extratos: ExtratoProps[], usuario: UsuarioProps): Promise<Resultado<void>> {
        const consultarCartoes = await this.repo.consultar(usuario)
        const cartoes = consultarCartoes.instancia
        if (consultarCartoes.deuErrado) return consultarCartoes.comoFalha

        const cartoesAtualizadas = cartoes.map((cartao) => this.atualizarFaturas(cartao, extratos))
        return this.repo.salvarTodos(usuario, cartoesAtualizadas)
    }

    private atualizarFaturas(cartao: Cartao, extratos: ExtratoProps[]): Cartao {
        const datas = [...extratos.map((e) => e.data), ...cartao.faturas.map((s) => s.data)].map(
            (d) => new Date(d)
        )

        const min = fn.dt.min(...datas)!
        const max = fn.dt.max(...datas)!

        const faturas: FaturaProps[] = fn.dt.mesesEntre(min, max).map((data) => {
            const id = AnoMesId.novo(data).instancia.valor
            const extratoDoMes = extratos.find((e) => e.id === id)
            const faturaDoMes = cartao.faturas.find((f) => f.id.valor === id)
            if (!extratoDoMes) return faturaDoMes!.props

            const valor = extratoDoMes.transacoes
                .filter((t) => t.cartaoId === cartao.id.valor)
                .reduce(this.somarValor, 0)
            return {
                id,
                data,
                valor,
                valorPlanejado: faturaDoMes?.valorPlanejado ?? 0,
            } as FaturaProps
        })

        return Cartao.novo({ ...cartao.props, faturas }).instancia
    }

    private somarValor(valor: number, tr: TransacaoProps): number {
        return tr.operacao === TipoOperacao.RECEITA ? valor + tr.valor : valor - tr.valor
    }
}
