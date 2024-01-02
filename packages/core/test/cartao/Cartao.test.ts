import { Cartao } from '../../src'
import CartaoBuilder from '../data/CartaoBuilder'

test('Deve instanciar um objeto com 4 atributos', () => {
    const criarCartao = CartaoBuilder.criar().build()
    expect(criarCartao.deuCerto).toBe(true)

    const cartao = criarCartao.instancia
    const props = cartao.props
    expect(Object.keys(props).join(',')).toBe('id,descricao,bandeira,cor,faturas')
})

test('Deve ter os mesmos valores do objeto original', () => {
    const criarCartao = CartaoBuilder.criar()
        .comDescricao('abc')
        .comBandeira('def')
        .comCor('#CCC')
        .build()
    const props = criarCartao.instancia.props
    expect(props.descricao).toBe('abc')
    expect(props.bandeira).toBe('def')
    expect(props.cor).toBe('#CCC')
})

test('Deve criar modelo a partir de props válidas', () => {
    const props = CartaoBuilder.criar().comDescricao('abc').comBandeira('def').comCor('#CCC').toProps()
    const criarCartao = Cartao.novo(props)

    const cartao = criarCartao.instancia
    expect(cartao.descricao.valor).toBe('abc')
    expect(cartao.bandeira.valor).toBe('def')
    expect(cartao.cor?.valor).toBe('#CCC')
})

test('Deve gerar erro a partir de props inválidas', () => {
    const props = CartaoBuilder.criar().semDescricao().comBandeira('def').comCor('#CCC').toProps()
    const criarCartao = Cartao.novo(props)
    expect(criarCartao.deuErrado).toBe(true)
})
