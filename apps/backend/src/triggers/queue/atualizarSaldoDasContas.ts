import { core } from '../../core'
import { EventoDTO, ExtratoDTO, UsuarioDTO } from 'adapters'
import * as functions from 'firebase-functions'

const atualizarSaldoDasContas = functions.pubsub
    .topic('extrato-alterado')
    .onPublish(async (message) => {
        const eventoDTO: EventoDTO = message.json
        const extratos: ExtratoDTO[] = eventoDTO.corpo

        const email = eventoDTO.usuarioEmail!
        const usuario: UsuarioDTO = { nome: '', email, config: {} }
        await core.conta.atualizarSaldos(usuario, extratos)
        functions.logger.info(extratos, usuario)
    })

export { atualizarSaldoDasContas }
