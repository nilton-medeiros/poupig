const fs = require('fs')
const path = require('path')

function criarPastas(dep) {
    const dirAtual = path.dirname(__filename)
    const dir = path.join(dirAtual, '..', '..', 'build', 'packages', dep)

    try {
        if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true })
        fs.mkdirSync(dir, { recursive: true })
    } catch (err) {
        console.error(err)
    }
}

criarPastas('utils')
criarPastas('core')
criarPastas('adapters')
