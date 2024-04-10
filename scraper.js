/*
 * works on https://it.wikipedia.org/wiki/Alessandro_Borghese_-_4_ristoranti
 * it reads data for each of the show's seasons and parses it into an object,
 * which then is downloaded in JSON format
 */
const scrape = () => {
  const BONUS_SEASON_START_INDEX = 3

  const downloadJson = ({ content }) => {
    const a = document.createElement('a')
    const file = new Blob([content], { type: 'text/plain' })
    a.href = URL.createObjectURL(file)
    a.download = 'json.txt'
    a.click()
  }

  const getCleanHtmlFromNode = (node) => {
    if (!node) return

    return (
      node.children?.length
        ? node.children[0].innerHTML
        : node.innerHTML
    ).replace('\n', '')
  }

  const parseRows = (rows, i) => {
    return rows.map(row => {
      const children = Array.from(row.children)

      return ({
        location: getCleanHtmlFromNode(children[1]),
        theme: getCleanHtmlFromNode(children[2]),
        firstAirDate: getCleanHtmlFromNode(i < BONUS_SEASON_START_INDEX ? children[3] : children[4]),
        special: getCleanHtmlFromNode(i >= BONUS_SEASON_START_INDEX ? (children[3]) : undefined)
      })
    })
  }

  const headers = [...document.querySelectorAll('th')].filter(h => {
    return h.innerHTML.indexOf('Location') > -1
  })

  const data = headers.map((h, i) => {
    const table = h.closest('table')
    const tbody = table.children[0]
    const rows = [...tbody.children]

    return parseRows(rows.slice(1), i)
  })

  downloadJson({ content: JSON.stringify(data) })
}

export {
  scrape
}
