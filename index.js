const fs = require('node:fs/promises')

// Ejercicio 2
async function writeFile(filePath, data, callback) {
  try {
    await fs.mkdir(filePath, { recursive: true })
  } catch (err) {
    callback(err)
    return
  }

  try {
    await fs.writeFile(filePath + '.txt', data)
    callback()
  } catch (err) {
    callback(err)
    return
  }
}

// Ejercicio 3
async function readFileAndCount(word, callback) {
  const path = process.argv[2]

  if (!word) {
    callback(new Error('No se ha especificado la palabra a buscar'))
    return
  }

  if (!path) {
    callback(new Error('No se ha especificado el path del archivo'))
    return
  }

  try {
    const data = await fs.readFile(path, 'utf8')
    const count = data
      .replace(/[\W_]/g, ' ')
      .split(' ')
      .filter((w) => w === 'node').length

    callback(null, count)
  } catch (err) {
    callback(null, 0)
  }
}

module.exports = {
  writeFile,
  readFileAndCount
}
