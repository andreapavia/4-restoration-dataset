/*
 * works on https://it.wikipedia.org/wiki/Alessandro_Borghese_-_4_ristoranti
 * it reads data for each of the show's seasons and parses it into an object,
 * which then is downloaded in JSON format
 */
const scrape = () => {
  const BONUS_SEASON_START_INDEX = 3

  const downloadJson = (content) => {
    const a = document.createElement('a')
    const file = new Blob([content], { type: 'text/plain' })
    a.href = URL.createObjectURL(file)
    a.download = 'json.txt'
    a.click()
  }

  // TODO rename: this does not return HTML but parses HTML into a string
  const parseHtmlFromNode = (node) => {
    if (!node) return

    const filteredChildren = Array.from(node.children).filter(n => n.tagName !== 'sup')

    return (
      filteredChildren.length
        ? node.children[0].innerHTML
        : node.innerHTML
    ).replace('\n', '')
  }

  const getParticipantsIndex = (index, rowsLength) => {
    if (index === rowsLength - 1) return 6

    return index >= BONUS_SEASON_START_INDEX ? 5 : 4
  }

  const parseParticipants = (participantsData) => {
    console.log(participantsData)

    return []
  }

  const parseRows = (rows, i) => {
    return rows.map(row => {
      const children = Array.from(row.children)
      const isFirstTV8AirDateRow = i === rows.length - 1
      const isBonusRow = i >= BONUS_SEASON_START_INDEX || isFirstTV8AirDateRow

      const participants = parseParticipants(
        parseHtmlFromNode(
          children[getParticipantsIndex(i, rows.length)],
          true
        )
      )

      return ({
        location: parseHtmlFromNode(children[1]),
        theme: parseHtmlFromNode(children[2]),
        firstAirDate: parseHtmlFromNode(!isBonusRow ? children[3] : children[4]),
        special: parseHtmlFromNode(isBonusRow ? (children[3]) : undefined),
        participants,
        winner: parseHtmlFromNode(!isBonusRow ? children[5] : children[6])
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

  downloadJson(JSON.stringify(data))
}

export {
  scrape
}
