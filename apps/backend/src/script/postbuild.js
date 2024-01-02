const fs = require('fs')
const path = require('path')
const { gerarPackageJson } = require('./util')

const dirAtual = path.dirname(__filename)

const depFn = (packageName) => ({
    ori: path.join(dirAtual, '..', '..', 'build', 'packages', packageName),
    dest: path.join(dirAtual, '..', '..', 'node_modules', packageName),
})

function configDep(packageName) {
    const dep = depFn(packageName)
    try {
        if (fs.existsSync(dep.dest)) fs.rmSync(dep.dest, { recursive: true, force: true })
        fs.cpSync(dep.ori, dep.dest, { recursive: true, force: true })

        gerarPackageJson(dep.ori, packageName)
        gerarPackageJson(dep.dest, packageName)
    } catch (err) {
        console.error(err)
    }
}

configDep('utils')
configDep('core')
configDep('adapters')
