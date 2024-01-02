import ColecaoContaMemoria from '../mock/ColecaoContaMemoria'
import ContaBuilder from '../data/ContaBuilder'
import SalvarConta from '../../src/conta/service/SalvarConta'
import UsuarioBuilder from '../data/UsuarioBuilder'

test('Deve salvar a conta corretamente', () => {
    const usuario = UsuarioBuilder.criar().comEmail('teste@gmail.com').toProps()
    const conta = ContaBuilder.criar().toProps()

    const salvarConta = new SalvarConta(new ColecaoContaMemoria()).executar(conta, usuario)
    expect(salvarConta).toBeTruthy()
})

test('Deve gerar um erro ao salvar a conta', () => {
    const usuario = UsuarioBuilder.criar().comEmail('teste@gmail.com').toProps()
    const conta = ContaBuilder.criar().semId().semBanco().semCor().semDescricao().toProps()

    const salvarConta = new SalvarConta(new ColecaoContaMemoria()).executar(conta, usuario)

    return salvarConta.then((resultado) => {
        expect(resultado.comoFalha).toBeTruthy()
    })
})
