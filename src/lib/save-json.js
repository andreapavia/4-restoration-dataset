const fs = require('fs')

const saveJson = (path, json) => {
  fs.writeFile(path, json, 'utf8', () => {
    console.log('JSON saved.')
  })
}

module.exports = {
  saveJson
}
