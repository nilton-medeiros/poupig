import ColecaoContaMemoria from '../mock/ColecaoContaMemoria'
import ConsultarContas from '../../src/conta/service/ConsultarContas'
import UsuarioBuilder from '../data/UsuarioBuilder'

test('Deve consultar a conta corretamente', () => {
    const usuario = UsuarioBuilder.criar().comEmail('teste@gmail.com').toProps()

    const consultarConta = new ConsultarContas(new ColecaoContaMemoria()).executar(usuario)
    expect(consultarConta).toBeTruthy()
})

test('Deve gerar um erro ao consultar a conta', () => {
    const usuario = UsuarioBuilder.criar().semEmail().toProps()

    const consultarConta = new ConsultarContas(new ColecaoContaMemoria()).executar(usuario)

    return consultarConta.then((resultado) => {
        expect(resultado.comoFalha).toBeTruthy()
    })
})
