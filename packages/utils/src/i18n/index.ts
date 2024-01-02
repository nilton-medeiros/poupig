import Erros from './Erros'
import Locale from './Locale'
import LocaleHub from './LocaleHub'

LocaleHub.addLocales([
    { lingua: 'pt-BR', moeda: 'BRL', erros: [] },
    { lingua: 'en-US', moeda: 'USD', erros: [] },
])

export type { Locale }
export { Erros, LocaleHub }
