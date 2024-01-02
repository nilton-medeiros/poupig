import CategoriaBuilder from '../data/CategoriaBuilder'
import ColecaoCategoriaMemoria from '../mock/ColecaoCategoriaMemoria'
import ExcluirCategoria from '../../src/categoria/service/ExcluirCategoria'
import UsuarioBuilder from '../data/UsuarioBuilder'

test('Deve excluir a categoria corretamente', () => {
    const usuario = UsuarioBuilder.criar().comEmail('teste@gmail.com').toProps()
    const categoria = CategoriaBuilder.criar().toProps()

    const excluirCategoria = new ExcluirCategoria(new ColecaoCategoriaMemoria()).executar(
        categoria,
        usuario
    )
    expect(excluirCategoria).toBeTruthy()
})

test('Deve gerar um erro ao excluir a categoria', () => {
    const usuario = UsuarioBuilder.criar().comEmail('teste@gmail.com').toProps()
    const categoria = CategoriaBuilder.criar().semId().semCor().semNome().semIdPai().toProps()

    const excluirCategoria = new ExcluirCategoria(new ColecaoCategoriaMemoria()).executar(
        categoria,
        usuario
    )

    return excluirCategoria.then((resultado) => {
        expect(resultado.comoFalha).toBeTruthy()
    })
})
