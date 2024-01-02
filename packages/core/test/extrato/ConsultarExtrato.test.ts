import ConsultarExtrato from '../../src/extrato/service/ConsultarExtrato'
import UsuarioBuilder from '../data/UsuarioBuilder'
import ColecaoExtratoMemoria from '../mock/ColecaoExtratoMemoria'

test('Deve consultar o extrato corretamente', () => {
    const usuario = UsuarioBuilder.criar().comEmail('teste@gmail.com').toProps()
    const consultarConta = new ConsultarExtrato(new ColecaoExtratoMemoria()).executar(
        new Date(),
        usuario
    )
    expect(consultarConta).toBeTruthy()
})

test('Deve gerar um erro ao consultar o extrato', async () => {
    const usuario = UsuarioBuilder.criar().semEmail().toProps()
    const consultarConta = new ConsultarExtrato(new ColecaoExtratoMemoria()).executar(
        new Date(),
        usuario
    )

    return consultarConta.then((resultado) => {
        expect(resultado.comoFalha).toBeTruthy()
    })
})
