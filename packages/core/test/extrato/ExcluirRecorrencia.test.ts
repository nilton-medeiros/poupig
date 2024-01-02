import ExcluirRecorrencia from '../../src/extrato/service/ExcluirRecorrencia'
import UsuarioBuilder from '../data/UsuarioBuilder'
import ColecaoExtratoMemoria from '../mock/ColecaoExtratoMemoria'
import ColecaoPublicadorDeEventoMemoria from '../mock/ColecaoPublicadorDeEvento'

test('Deve excluir a recorrencia corretamente', () => {
    const usuario = UsuarioBuilder.criar().toProps()
    const excluirRecorrencia = new ExcluirRecorrencia(
        new ColecaoExtratoMemoria(),
        new ColecaoPublicadorDeEventoMemoria()
    ).executar('123', usuario)
    expect(excluirRecorrencia).toBeTruthy()
})

test('Deve gerar um erro ao excluir a recorrencia', async () => {
    const usuario = UsuarioBuilder.criar().semEmail().toProps()
    const excluirRecorrencia = new ExcluirRecorrencia(
        new ColecaoExtratoMemoria(),
        new ColecaoPublicadorDeEventoMemoria()
    ).executar('123', usuario)

    return excluirRecorrencia.then((resultado) => {
        expect(resultado.comoFalha).toBeTruthy()
    })
})
