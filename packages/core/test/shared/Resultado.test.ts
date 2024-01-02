import Resultado from '../../src/shared/base/Resultado'

test('Deve combinar resultados de sucesso', () => {
    const resultados = Resultado.combinar<any>([
        Resultado.ok(1),
        Resultado.ok('x'),
        Resultado.ok(3),
    ])

    expect(resultados.deuCerto).toBeTruthy()
    expect(resultados.deuErrado).toBeFalsy()
    expect(resultados.instancia).toEqual([1, 'x', 3])
    expect(resultados.erros).toBeUndefined()
})

test('Deve combinar resultados de falha com causas', () => {
    const resultados = Resultado.combinar([
        Resultado.ok(1),
        Resultado.falha({ tipo: 'x', valor: 2 }),
        Resultado.ok(3),
        Resultado.falha({ tipo: 'y', valor: 4 }),
    ])

    const err = JSON.stringify(resultados.erros)

    expect(resultados.deuCerto).toBeFalsy()
    expect(resultados.deuErrado).toBeTruthy()
    expect(err).toEqual(
        JSON.stringify([
            { tipo: 'x', valor: 2 },
            { tipo: 'y', valor: 4 },
        ])
    )
})

test('Deve combinar resultados de falha sem causas', () => {
    const resultados = Resultado.combinar([
        Resultado.ok(1),
        Resultado.falha('x'),
        Resultado.ok(3),
        Resultado.falha('y'),
    ])

    const err = JSON.stringify(resultados.erros)

    expect(resultados.deuCerto).toBeFalsy()
    expect(resultados.deuErrado).toBeTruthy()
    expect(err).toEqual(JSON.stringify([{ tipo: 'x' }, { tipo: 'y' }]))
})
