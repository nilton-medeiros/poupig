import SalvarRecorrencia from '../../src/extrato/service/SalvarRecorrencia'
import RecorrenciaBuilder from '../data/RecorrenciaBuilder'
import UsuarioBuilder from '../data/UsuarioBuilder'
import ColecaoExtratoMemoria from '../mock/ColecaoExtratoMemoria'
import ColecaoPublicadorDeEventoMemoria from '../mock/ColecaoPublicadorDeEvento'

test('Deve salvar a recorrencia corretamente', () => {
    const usuario = UsuarioBuilder.criar().toProps()
    const recorrencia = RecorrenciaBuilder.criar().toProps()
    const salvarRecorrencia = new SalvarRecorrencia(
        new ColecaoExtratoMemoria(),
        new ColecaoPublicadorDeEventoMemoria()
    ).executar(recorrencia, usuario)

    return salvarRecorrencia.then((resultado) => {
        expect(resultado.deuCerto).toBeTruthy()
    })
})

test('Deve gerar um erro ao consultar as recorrencias', async () => {
    const usuario = UsuarioBuilder.criar().semEmail().toProps()
    const recorrencia = RecorrenciaBuilder.criar().toProps()
    const salvarRecorrencia = new SalvarRecorrencia(
        new ColecaoExtratoMemoria(),
        new ColecaoPublicadorDeEventoMemoria()
    ).executar(recorrencia, usuario)

    return salvarRecorrencia.then((resultado) => {
        expect(resultado.comoFalha).toBeTruthy()
    })
})
