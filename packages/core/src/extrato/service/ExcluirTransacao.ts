import { EventoProps } from '../../evento'
import { TransacaoProps } from '..'
import { UsuarioProps } from '../../usuario'
import CasoDeUso from '../../shared/base/CasoDeUso'
import Extrato, { ExtratoProps } from '../model/Extrato'
import ExtratosAlterados from '../event/ExtratosAlterados'
import PublicadorEvento from '../../evento/provider/PublicadorEvento'
import RepositorioExtrato from '../provider/RepositorioExtrato'
import Resultado from '../../shared/base/Resultado'

interface Entrada {
    extrato: ExtratoProps
    transacao: TransacaoProps
}

export default class ExcluirTransacao implements CasoDeUso<Entrada, void> {
    constructor(
        private repo: RepositorioExtrato,
        private publicadorEvento: PublicadorEvento
    ) {}

    async executar(entrada: Entrada, usuario: UsuarioProps): Promise<Resultado<void>> {
        const extratoProps = entrada.extrato
        const transacaoProps = entrada.transacao

        const outrasTransacoes = (extratoProps.transacoes ?? []).filter((t) => {
            return t.id !== transacaoProps.id
        })

        const gerarExtrato = Extrato.novo({ ...extratoProps, transacoes: outrasTransacoes })
        if (gerarExtrato.deuErrado) return gerarExtrato.comoFalha

        const extrato = gerarExtrato.instancia
        await this.repo.salvar(usuario, extrato)

        const evento = ExtratosAlterados.novo({
            usuarioEmail: usuario.email,
            corpo: [extrato.props],
        } as EventoProps).instancia

        return this.publicadorEvento.publicar(evento)
    }
}
