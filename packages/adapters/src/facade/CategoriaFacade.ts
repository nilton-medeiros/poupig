import { UsuarioDTO, CategoriaDTO } from '../dto'
import {
    ConsultarCategorias,
    ExcluirCategoria,
    RepositorioCategoria,
    SalvarCategoria,
    SalvarCategorias,
} from 'core'

export default class CategoriaFacade {
    constructor(readonly repo: RepositorioCategoria) {}

    async salvar(usuario: UsuarioDTO, categoria: CategoriaDTO): Promise<void> {
        const casoDeUso = new SalvarCategoria(this.repo)
        const resultado = await casoDeUso.executar(categoria, usuario)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
    }

    async salvarTodas(usuario: UsuarioDTO, categorias: CategoriaDTO[]): Promise<void> {
        const casoDeUso = new SalvarCategorias(this.repo)
        const resultado = await casoDeUso.executar(categorias, usuario)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
    }

    async excluir(usuario: UsuarioDTO, categoria: CategoriaDTO): Promise<void> {
        const casoDeUso = new ExcluirCategoria(this.repo)
        const resultado = await casoDeUso.executar(categoria, usuario)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
    }

    async consultar(usuario: UsuarioDTO): Promise<CategoriaDTO[]> {
        const casoDeUso = new ConsultarCategorias(this.repo)
        const resultado = await casoDeUso.executar(usuario)
        if (resultado.deuErrado) resultado.lancarErrorSeDeuErrado()
        return resultado.instancia
    }
}
