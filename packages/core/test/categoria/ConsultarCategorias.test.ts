import ColecaoCategoriaMemoria from '../mock/ColecaoCategoriaMemoria'
import ConsultarCategorias from '../../src/categoria/service/ConsultarCategorias'
import UsuarioBuilder from '../data/UsuarioBuilder'

test('Deve consultar as categorias corretamente', () => {
    const usuario = UsuarioBuilder.criar().comEmail('teste@gmail.com').toProps()

    const consultarCategorias = new ConsultarCategorias(new ColecaoCategoriaMemoria()).executar(
        usuario
    )
    expect(consultarCategorias).toBeTruthy()
})
