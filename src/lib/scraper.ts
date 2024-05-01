import { parseRows } from './parse-rows'
import { saveJson } from './save-json'

const scrape = (document: Document) => {
  const headers = [...document.querySelectorAll('th')].filter((h) => {
    return h.innerHTML.indexOf('Location') > -1
  })

  const data = headers.map((h, i) => {
    const table: HTMLElement = h.closest('table') || document.createElement('table')
    const tbody = table.children[0]
    const rows = [...tbody.children]

    return parseRows(rows.slice(1), i)
  })

  saveJson('./4-restoration-dataset.json', JSON.stringify(data))
}

export { scrape }
