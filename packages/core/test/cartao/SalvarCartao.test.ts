import CartaoBuilder from '../data/CartaoBuilder'
import ColecaoCartaoMemoria from '../mock/ColecaoCartaoMemoria'
import SalvarCartao from '../../src/cartao/service/SalvarCartao'
import UsuarioBuilder from '../data/UsuarioBuilder'

test('Deve salvar o cartão corretamente', () => {
    const cartao = CartaoBuilder.criar().toProps()
    const usuario = UsuarioBuilder.criar().toProps()
    const salvarCartao = new SalvarCartao(new ColecaoCartaoMemoria()).executar(cartao, usuario)
    expect(salvarCartao).toBeTruthy()
})

test('Deve gerar um erro ao salvar o cartão', () => {
    const cartao = CartaoBuilder.criar().semId().semBandeira().semDescricao().toProps()
    const usuario = UsuarioBuilder.criar().comEmail('teste@gmail.com').toProps()

    const salvarCartao = new SalvarCartao(new ColecaoCartaoMemoria()).executar(cartao, usuario)

    return salvarCartao.then((resultado) => {
        expect(resultado.comoFalha).toBeTruthy()
    })
})
