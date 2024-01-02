import AtualizarFaturas from '../../src/cartao/service/AtualizarFaturas'
import ColecaoCartaoMemoria from '../mock/ColecaoCartaoMemoria'
import ExtratoBuilder from '../data/extrato/ExtratoBuilder'
import UsuarioBuilder from '../data/UsuarioBuilder'

test('Deve atualizar a fatura do usuário corretamente', () => {
    const usuario = UsuarioBuilder.criar().toProps()
    const extrato = ExtratoBuilder.criar().toProps()
    const atualizarFatura = new AtualizarFaturas(new ColecaoCartaoMemoria()).executar(
        [extrato],
        usuario
    )

    expect(atualizarFatura).toBeTruthy()
})
