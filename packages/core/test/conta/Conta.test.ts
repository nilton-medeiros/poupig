import { fn } from 'utils'
import Conta from '../../src/conta/model/Conta'
import ContaBuilder from '../data/ContaBuilder'
import SaldoBuilder from '../data/SaldoBuilder'

test('Deve calcular o valor acumulado', () => {
    const datas = fn.dt.datasEntre(new Date('2022/1/1'), new Date('2024/1/1'))
    const saldos = datas.map((dt) =>
        SaldoBuilder.criar().comValor(10000).comAcumulado(10000).comData(dt).toProps()
    )
    const contaProps = ContaBuilder.criar().comSaldos(saldos).toProps()

    // TODO: Solucionar teste

    const criarConta = Conta.nova(contaProps)
    expect(criarConta.deuCerto).toBe(true)

    const conta = criarConta.instancia
    expect(conta.saldos[0]!.acumulado).toBe(0)
    // expect(conta.saldos[1].acumulado).toBe(10000)
    // expect(conta.saldos[2].acumulado).toBe(20000)
    // expect(conta.saldos[20].acumulado).toBe(200000)
})
