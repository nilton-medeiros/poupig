import CartaoBuilder from '../data/CartaoBuilder'
import ColecaoCartaoMemoria from '../mock/ColecaoCartaoMemoria'
import ExcluirCartao from '../../src/cartao/service/ExcluirCartao'
import UsuarioBuilder from '../data/UsuarioBuilder'

test('Deve excluir o cartão corretamente', () => {
    const cartao = CartaoBuilder.criar().toProps()
    const usuario = UsuarioBuilder.criar().toProps()
    const excluirCartao = new ExcluirCartao(new ColecaoCartaoMemoria()).executar(cartao, usuario)
    expect(excluirCartao).toBeTruthy()
})

test('Deve gerar um erro ao excluir o cartão', () => {
    const cartao = CartaoBuilder.criar().semId().semBandeira().semDescricao().toProps()
    const usuario = UsuarioBuilder.criar().comEmail('teste@gmail.com').toProps()

    const excluirCartao = new ExcluirCartao(new ColecaoCartaoMemoria()).executar(cartao, usuario)

    return excluirCartao.then((resultado) => {
        expect(resultado.comoFalha).toBeTruthy()
    })
})
