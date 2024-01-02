import Erro from '../error/Erro'
import LocaleHub from './LocaleHub'
import TradutorErro from './TradutorErro'

export default class Erros {
    static traduzir(erros: Erro[]): string[] {
        return new TradutorErro(LocaleHub.erros).traduzirTudo(erros)
    }
}
