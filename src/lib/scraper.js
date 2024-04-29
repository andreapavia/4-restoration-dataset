import { parseRows } from './parse-rows'
import { saveJson } from './save-json'

const scrape = (document) => {
  const headers = [...document.querySelectorAll('th')].filter((h) => {
    return h.innerHTML.indexOf('Location') > -1
  })

  const data = headers.map((h, i) => {
    const table = h.closest('table')
    const tbody = table.children[0]
    const rows = [...tbody.children]

    return parseRows(rows.slice(1), i)
  })

  saveJson('./4-restoration-dataset.json', JSON.stringify(data))
}

export { scrape }
