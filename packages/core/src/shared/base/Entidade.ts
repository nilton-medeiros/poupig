import Id from '../types/Id'
import Props from './Props'

export interface EntidadeProps extends Props {
    id?: string
}

export default class Entidade<Tipo, Props extends EntidadeProps> {
    constructor(readonly id: Id) {}

    equals(entidade: Entidade<Tipo, Props>): boolean {
        return this.id.equals(entidade.id)
    }
}
