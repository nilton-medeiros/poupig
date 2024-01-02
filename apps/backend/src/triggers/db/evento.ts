import { EventoDTO, Repositorios } from 'adapters'
import { fn } from 'utils'
import { PubSub } from '@google-cloud/pubsub'
import * as functions from 'firebase-functions'

import FirestoreAdminProvider from '../../core/adapters/db/FirestoreAdminProvider'

const eventoDoc = functions.firestore.document('/eventos/{id}')

export const eventoMudou = eventoDoc.onCreate(async (snap) => {
    functions.logger.info(`Evento ${snap.id} criado`)

    const evento: EventoDTO = fn.dt.converterDataFS(snap.data())
    const idProjeto = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT
    const pubsub = new PubSub()
    const topic = pubsub.topic(`projects/${idProjeto}/topics/${evento.tipo}`)

    const messageId = await topic.publishMessage({ json: evento })
    functions.logger.info(`Mensagem ${messageId} publicada.`)

    const colecao = new Repositorios(new FirestoreAdminProvider()).evento
    colecao.excluir(evento.id!)
})
