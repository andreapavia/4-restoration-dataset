const { BONUS_SEASON_START_INDEX } = require('../util/constants')
const { getParticipantsIndex } = require('./get-participants-index')
const { parseHtmlFromNode } = require('./parse-html-from-node')
const { parseParticipants } = require('./parse-participants')

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

module.exports = {
  parseRows
}
