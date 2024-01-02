const fs = require('fs')
const path = require('path')

module.exports = {
    gerarPackageJson(dir, packageName) {
        const conteudo = `{
            "name": "${packageName}",
            "version": "1.0.0",
            "main": "./src/index.js"
        }`
        const caminho = path.join(dir, 'package.json')
        try {

            fs.rmSync(caminho, { force: true })
            fs.writeFileSync(
                path.join(dir, 'package.json'),
                conteudo
            )
        } catch (err) {
            console.error(err)
        }
    }
}