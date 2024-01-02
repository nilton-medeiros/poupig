import { AnoMesId } from '../../shared'
import { fn } from 'utils'
import { ExtratoProps, TransacaoProps } from '../../extrato'
import { SaldoProps } from '..'
import { TipoOperacao } from '../../extrato'
import { UsuarioProps } from '../../usuario'
import CasoDeUso from '../../shared/base/CasoDeUso'
import Conta from '../model/Conta'
import RepositorioConta from '../provider/RepositorioConta'
import Resultado from '../../shared/base/Resultado'

export default class AtualizarSaldos implements CasoDeUso<ExtratoProps[], void> {
    constructor(private repo: RepositorioConta) {}

    async executar(extratos: ExtratoProps[], usuario: UsuarioProps): Promise<Resultado<void>> {
        const consultarContas = await this.repo.consultar(usuario)
        const contas = consultarContas.instancia
        if (consultarContas.deuErrado) return consultarContas.comoFalha

        const contasAtualizadas = contas.map((conta) => this.atualizarSaldos(conta, extratos))
        return this.repo.salvarTodas(usuario, contasAtualizadas)
    }

    private atualizarSaldos(conta: Conta, extratos: ExtratoProps[]): Conta {
        const datas = [...extratos.map((e) => e.data), ...conta.saldos.map((s) => s.data)].map(
            (d) => new Date(d)
        )

        const min = fn.dt.min(...datas)!
        const max = fn.dt.max(...datas)!

        const saldos: SaldoProps[] = fn.dt.mesesEntre(min, max).map((data) => {
            const id = AnoMesId.novo(data).instancia.valor
            const extratoDoMes = extratos.find((e) => e.id === id)
            const saldoDoMes = conta.saldos.find((s) => s.id.valor === id)
            if (!extratoDoMes) return saldoDoMes!.props

            const trsDasContas = extratoDoMes.transacoes.filter((t) => t.contaId === conta.id.valor)
            const creditos = trsDasContas.reduce(this.somarValor(TipoOperacao.RECEITA), 0)
            const debitos = trsDasContas.reduce(this.somarValor(TipoOperacao.DESPESA), 0)
            return { id, data, creditos, debitos, acumulado: 0 } as SaldoProps
        })

        return Conta.nova({ ...conta.props, saldos }).instancia
    }

    private somarValor(tipo: TipoOperacao) {
        return (valor: number, tr: TransacaoProps): number => {
            return tipo === tr.operacao ? Math.abs(valor) + Math.abs(tr.valor) : valor
        }
    }
}
