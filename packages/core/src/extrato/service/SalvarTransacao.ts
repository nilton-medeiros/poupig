import { AnoMesId } from '../../shared'
import { EventoProps } from '../../evento'
import { UsuarioProps } from '../../usuario'
import CasoDeUso from '../../shared/base/CasoDeUso'
import ConsultarExtrato from './ConsultarExtrato'
import Extrato, { ExtratoProps } from '../model/Extrato'
import ExtratosAlterados from '../event/ExtratosAlterados'
import PublicadorEvento from '../../evento/provider/PublicadorEvento'
import RepositorioExtrato from '../provider/RepositorioExtrato'
import Resultado from '../../shared/base/Resultado'
import TipoErro from '../../shared/types/TipoErro'
import Transacao, { TransacaoProps } from '../model/Transacao'

interface Entrada {
    extrato: ExtratoProps
    transacao: TransacaoProps
}

export default class SalvarTransacao implements CasoDeUso<Entrada, void> {
    constructor(
        private repo: RepositorioExtrato,
        private consultarExtrato: ConsultarExtrato,
        private publicadorEvento: PublicadorEvento
    ) {}

    async executar(entrada: Entrada, usuario: UsuarioProps): Promise<Resultado<void>> {
        const extratoProps = entrada.extrato
        const transacaoProps = entrada.transacao

        if (this.perteceAoExtrato(extratoProps, transacaoProps)) {
            return this.salvarTransacaoNoExtrato(extratoProps, transacaoProps, usuario)
        } else if (transacaoProps.recorrenciaId) {
            return Resultado.falha({ tipo: TipoErro.PARCELA_NAO_PODE_MUDAR_MES })
        } else {
            return this.salvarTransacaoEmOutroExtrato(extratoProps, transacaoProps, usuario)
        }
    }

    private async salvarTransacaoNoExtrato(
        extratoProps: ExtratoProps,
        transacaoProps: TransacaoProps,
        usuario: UsuarioProps
    ) {
        const extratoAlterado = this.extratoCom(transacaoProps, extratoProps)
        const gerarExtrato = Extrato.novo(extratoAlterado)
        if (gerarExtrato.deuErrado) return gerarExtrato.comoFalha

        const extrato = gerarExtrato.instancia
        await this.repo.salvar(usuario, extrato)
        return this.publicarEvento(usuario, extrato.props)
    }

    private async salvarTransacaoEmOutroExtrato(
        extratoProps: ExtratoProps,
        transacaoProps: TransacaoProps,
        usuario: UsuarioProps
    ) {
        const consultarOutroExtrato = await this.consultarExtrato.executar(
            transacaoProps.data,
            usuario
        )
        if (consultarOutroExtrato.deuErrado) return consultarOutroExtrato.comoFalha

        const outroExtratoProps = consultarOutroExtrato.instancia
        const outroExtratoAlterado = this.extratoCom(transacaoProps, outroExtratoProps)
        const extratoAtualAlterado = this.extratoSem(transacaoProps, extratoProps)

        const gerarExtratoAtual = Extrato.novo(extratoAtualAlterado)
        if (gerarExtratoAtual.deuErrado) return gerarExtratoAtual.comoFalha

        const gerarOutroExtrato = Extrato.novo(outroExtratoAlterado)
        if (gerarOutroExtrato.deuErrado) return gerarOutroExtrato.comoFalha

        const extratoAtual = gerarExtratoAtual.instancia
        const outroExtrato = gerarOutroExtrato.instancia
        await this.repo.salvarTodos(usuario, [extratoAtual, outroExtrato])

        this.publicarEvento(usuario, extratoAtual.props)
        return this.publicarEvento(usuario, outroExtrato.props)
    }

    private extratoSem(transacaoProps: TransacaoProps, extratoProps: ExtratoProps): ExtratoProps {
        const outrasTransacoes = (extratoProps.transacoes ?? []).filter((t) => {
            return t.id !== transacaoProps.id
        })
        return { ...extratoProps, transacoes: outrasTransacoes }
    }

    private extratoCom(transacaoProps: TransacaoProps, extratoProps: ExtratoProps): ExtratoProps {
        const extrato = this.extratoSem(transacaoProps, extratoProps)
        const transacoes = [...extrato.transacoes, transacaoProps].sort(Transacao.sort)
        return { ...extratoProps, transacoes }
    }

    private publicarEvento(usuario: UsuarioProps, extrato: ExtratoProps) {
        const evento = ExtratosAlterados.novo({
            usuarioEmail: usuario.email,
            corpo: [extrato],
        } as EventoProps).instancia

        return this.publicadorEvento.publicar(evento)
    }

    private perteceAoExtrato(extrato: ExtratoProps, transacao: TransacaoProps) {
        const exAnoMes = AnoMesId.novo(extrato.data).instancia
        const trAnoMes = AnoMesId.novo(transacao.data).instancia
        return exAnoMes.equals(trAnoMes)
    }
}
