import { writeFile } from 'fs'

const saveJson = (path: string, json: string) => {
  writeFile(path, json, 'utf8', () => {
    console.log('JSON saved.')
  })
}

export { saveJson }
