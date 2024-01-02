import { CoreFacade } from 'adapters'
import FirestoreAdminProvider from './adapters/db/FirestoreAdminProvider'

const core = new CoreFacade(new FirestoreAdminProvider())
export { core }
