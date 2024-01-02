import { fn } from 'utils'

export interface VOConfig {
    cls?: string
    atr?: string
}

export default abstract class VO<T, Cfg extends VOConfig> {
    constructor(readonly valor: T, readonly cfg?: Cfg) {}

    equals(outro: VO<T, Cfg>): boolean {
        return fn.obj.iguais(this.valor, outro.valor)
    }
}
