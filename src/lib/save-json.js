import { writeFile } from 'fs'

const saveJson = (path, json) => {
  writeFile(path, json, 'utf8', () => {
    console.log('JSON saved.')
  })
}

export { saveJson }
