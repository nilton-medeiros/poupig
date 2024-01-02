import CategoriaBuilder from '../data/CategoriaBuilder'
import ColecaoCategoriaMemoria from '../mock/ColecaoCategoriaMemoria'
import SalvarCategorias from '../../src/categoria/service/SalvarCategorias'
import UsuarioBuilder from '../data/UsuarioBuilder'

test('Deve salvar as categorias corretamente', () => {
    const usuario = UsuarioBuilder.criar().comEmail('teste@gmail.com').toProps()
    const categoria = CategoriaBuilder.criar().toProps()
    const outraCategoria = CategoriaBuilder.criar().comNome('Outra categoria').toProps()

    const salvarCategoria = new SalvarCategorias(new ColecaoCategoriaMemoria()).executar(
        [categoria, outraCategoria],
        usuario
    )
    expect(salvarCategoria).toBeTruthy()
})

test('Deve gerar um erro ao salvar as categorias', () => {
    const usuario = UsuarioBuilder.criar().comEmail('teste@gmail.com').toProps()
    const categoria = CategoriaBuilder.criar().semId().semCor().semNome().semIdPai().toProps()
    const outraCategoria = CategoriaBuilder.criar().comNome('Outra categoria').toProps()

    const salvarCategoria = new SalvarCategorias(new ColecaoCategoriaMemoria()).executar(
        [categoria, outraCategoria],
        usuario
    )

    return salvarCategoria.then((resultado) => {
        expect(resultado.comoFalha).toBeTruthy()
    })
})
