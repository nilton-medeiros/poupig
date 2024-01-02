import { TransacaoProps } from '..'

export default interface FiltroTransacao {
    id: string
    nome?: string
    prioridade?: number
    aplicar: (params: any) => (transacoes: TransacaoProps[]) => TransacaoProps[]
}
