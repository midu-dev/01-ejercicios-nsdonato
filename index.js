const fs = require('node:fs')

// Ejercicio 2
async function writeFile (filePath, data, callback) {
  fs.mkdir(filePath, { recursive: true }, (err) => {
    if (err) throw err

    fs.writeFile(filePath + '.txt', data, (err) => {
      if (err) throw err
      callback()
    })
  })
}

// Ejercicio 3
async function readFileAndCount (word, callback) {
  const path = process.argv[2]

  if (!word) {
    callback(new Error('No se ha especificado la palabra a buscar'))
    return
  }

  if (!fs.existsSync(path)) {
    callback(new Error('No se ha especificado el path del archivo'))
    return
  }

  // Este o el de arriba no estan del todo bien. Falla 1 test.
  fs.access(path, fs.constants.F_OK, (err) => {
    if (err) {
      callback(null, 0)
    }
  })

  fs.readFile(path, 'utf8', (err, data) => {
    if (err) throw err

    const count = data
      .replace(/[\W_]/g, ' ')
      .split(' ')
      .filter((w) => w === 'node').length

    callback(null, count)
  })
}

module.exports = {
  writeFile,
  readFileAndCount
}
