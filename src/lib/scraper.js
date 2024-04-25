const parseRows = require('./parse-rows')

// TODO move to readme
/*
 * works on https://it.wikipedia.org/wiki/Alessandro_Borghese_-_4_ristoranti
 * it reads data for each of the show's seasons and parses it into an object,
 * which then is downloaded in JSON format
 */
const scrape = () => {
  const headers = [...document.querySelectorAll('th')].filter(h => {
    return h.innerHTML.indexOf('Location') > -1
  })

  const data = headers.map((h, i) => {
    const table = h.closest('table')
    const tbody = table.children[0]
    const rows = [...tbody.children]

    return parseRows(rows.slice(1), i)
  })

  console.log(JSON.stringify(data))
}

module.exports = {
  scrape
}
