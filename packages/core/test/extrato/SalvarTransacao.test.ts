import ConsultarExtrato from '../../src/extrato/service/ConsultarExtrato'
import SalvarRecorrencia from '../../src/extrato/service/SalvarRecorrencia'
import SalvarTransacao from '../../src/extrato/service/SalvarTransacao'
import RecorrenciaBuilder from '../data/RecorrenciaBuilder'
import UsuarioBuilder from '../data/UsuarioBuilder'
import ExtratoBuilder from '../data/extrato/ExtratoBuilder'
import TransacaoBuilder from '../data/extrato/TransacaoBuilder'
import ColecaoExtratoMemoria from '../mock/ColecaoExtratoMemoria'
import ColecaoPublicadorDeEventoMemoria from '../mock/ColecaoPublicadorDeEvento'

test('Deve salvar a transacao corretamente', () => {
    const usuario = UsuarioBuilder.criar().toProps()
    const entrada = {
        extrato: ExtratoBuilder.criar().toProps(),
        transacao: TransacaoBuilder.criar().toProps(),
    }
    const salvarTransacao = new SalvarTransacao(
        new ColecaoExtratoMemoria(),
        new ConsultarExtrato(new ColecaoExtratoMemoria()),
        new ColecaoPublicadorDeEventoMemoria()
    ).executar(entrada, usuario)

    return salvarTransacao.then((resultado) => {
        expect(resultado.deuCerto).toBeTruthy()
    })
})

test('Deve gerar um erro ao salvar a transacao', async () => {
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
