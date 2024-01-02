import ConsultarFiltrosExtrato from '../../src/extrato/service/ConsultarFiltrosExtrato'
import CartaoBuilder from '../data/CartaoBuilder'
import CategoriaBuilder from '../data/CategoriaBuilder'
import ContaBuilder from '../data/ContaBuilder'

test('Deve consultar os extratos com filtros corretamente', () => {
    const consultarConta = new ConsultarFiltrosExtrato().executar({
        cartoes: [CartaoBuilder.criar().toProps()],
        categorias: [CategoriaBuilder.criar().toProps()],
        contas: [ContaBuilder.criar().toProps()],
    })
    expect(consultarConta).toBeTruthy()
})

test('Deve gerar um erro ao consultar os extratos com filtros', async () => {
    const consultarConta = new ConsultarFiltrosExtrato().executar({
        cartoes: [],
        categorias: [],
        contas: [],
    })

    return consultarConta.then((resultado) => {
        expect(resultado.comoFalha).toBeTruthy()
    })
})
