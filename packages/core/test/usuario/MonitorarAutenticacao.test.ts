import MonitorarAutenticacao from "../../src/usuario/service/MonitorarAutenticacao"
import ColecaoAutenticacaoMemoria from "../mock/ColecaoAutenticacaoMemoria"
import ColecaoUsuarioMemoria from "../mock/ColecaoUsuarioMemoria"

test('Deve monitorar o login do usuário com provedor corretamente', () => {
    const monitorar = new MonitorarAutenticacao(
        new ColecaoAutenticacaoMemoria(),
        new ColecaoUsuarioMemoria()
    ).executar(() => { })


    expect(monitorar).toBeTruthy()
})