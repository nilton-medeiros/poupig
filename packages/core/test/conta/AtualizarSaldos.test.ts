import AtualizarSaldos from '../../src/conta/service/AtualizarSaldos'
import ColecaoContaMemoria from '../mock/ColecaoContaMemoria'
import ExtratoBuilder from '../data/extrato/ExtratoBuilder'
import UsuarioBuilder from '../data/UsuarioBuilder'

test('Deve atualizar os saldos da conta corretamente', () => {
    const usuario = UsuarioBuilder.criar().toProps()
    const extrato = ExtratoBuilder.criar().toProps()

    const atualizarSaldos = new AtualizarSaldos(new ColecaoContaMemoria()).executar(
        [extrato],
        usuario
    )
    expect(atualizarSaldos).toBeTruthy()
})

// test('Deve gerar um erro ao excluir a conta', () => {
//     const usuario = UsuarioBuilder.criar().comEmail('teste@gmail.com').toProps()
//     const conta = ContaBuilder.criar().semId().semBanco().semCor().semDescricao().toProps()

//     const excluirConta = new ExcluirConta(new ColecaoContaMemoria()).executar(
//         conta,
//         usuario
//     )

//     return excluirConta.then(resultado => {
//         expect(resultado.comoFalha).toBeTruthy()
//     })
// })
