import Categoria from '../../src/categoria/model/Categoria'
import CategoriaBuilder from '../data/CategoriaBuilder'

test('Deve instanciar um objeto e verificar se tem 5 atributos', () => {
    const criarCategoria = CategoriaBuilder.criar().build()
    expect(criarCategoria.deuCerto).toBe(true)

    const categoria = criarCategoria.instancia.props
    expect(Object.keys(categoria).join(',')).toBe('id,nome,idPai,pai,subcategorias')
})

test('Deve ter os mesmos valores do objeto original', () => {
    const criarCategoria = CategoriaBuilder.criar().comId('def').comNome('abc').build()
    const props = criarCategoria.instancia.props
    expect(props.nome).toBe('abc')
    expect(props.id).toBe('def')
})

test('Deve criar modelo a partir de props válidas', () => {
    const props = CategoriaBuilder.criar().comNome('abc').comId('def').toProps()
    const criarCategoria = Categoria.nova(props)

    const categoria = criarCategoria.instancia
    expect(categoria.nome.valor).toBe('abc')
    expect(categoria.id.valor).toBe('def')
})

test('Deve gerar erro a partir de props inválidas', () => {
    const props = CategoriaBuilder.criar().semNome().toProps()
    const criarCategoria = Categoria.nova(props)
    expect(criarCategoria.deuErrado).toBe(true)
})

test('Deve uma categoria com filho', () => {
    const categoriaPai = CategoriaBuilder.criar().comNome('ABC').build()

    const categoriaFilho = CategoriaBuilder.criar()
        .comNome('DEF')
        .comIdPai(categoriaPai.instancia.props.id!)
        .comPai(categoriaPai.instancia.props)
        .comSubcategorias([categoriaPai.instancia.props])
        .build()

    const categoriaFilhoProps = categoriaFilho.instancia.props
    expect(categoriaFilhoProps.idPai).toBe(categoriaPai.instancia.props.id)
    expect(categoriaFilhoProps.subcategorias?.length).toBeGreaterThan(0)
    expect(Object.keys(categoriaFilhoProps.pai!).join(',')).toBe('id,nome,idPai,pai,subcategorias')
})
