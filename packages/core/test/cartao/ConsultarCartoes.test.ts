import ConsultarCartoes from '../../src/cartao/service/ConsultarCartoes'
import UsuarioBuilder from '../data/UsuarioBuilder'
import ColecaoCartaoMemoria from '../mock/ColecaoCartaoMemoria'

test('Deve consultar os cartões do usuário corretamente', () => {
    const usuario = UsuarioBuilder.criar().toProps()
    const consultar = new ConsultarCartoes(new ColecaoCartaoMemoria()).executar(usuario)

    expect(consultar).toBeTruthy()
})
