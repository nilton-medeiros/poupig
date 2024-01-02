import ConsultarPorEmail from '../../src/usuario/service/ConsultarPorEmail'
import Dados from '../data/bases/Dados'
import ColecaoUsuarioMemoria from '../mock/ColecaoUsuarioMemoria'

test('Deve consultar o usuário corretamente', () => {
    const consultarUsuario = new ConsultarPorEmail(new ColecaoUsuarioMemoria()).executar(
        Dados.email.especifico(0)
    )
    expect(consultarUsuario).toBeTruthy()
})
