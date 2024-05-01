import { Row } from 'src/util/types'
import { BONUS_SEASON_START_INDEX } from '../util/constants'
import { getParticipantsIndex } from './get-participants-index'
import { parseHtmlFromNode } from './parse-html-from-node'
import { parseParticipants } from './parse-participants'

const parseRows = (rows: Row[], i: number) => {
  return rows.map((row) => {
    const children = Array.from(row.children)
    const isFirstTV8AirDateRow = i === rows.length - 1
    const isBonusRow = i >= BONUS_SEASON_START_INDEX || isFirstTV8AirDateRow

    const participants = parseParticipants(
      parseHtmlFromNode(children[getParticipantsIndex(i, rows.length)])
    )

    return {
      location: parseHtmlFromNode(children[1]),
      theme: parseHtmlFromNode(children[2]),
      firstAirDate: parseHtmlFromNode(!isBonusRow ? children[3] : children[4]),
      special: parseHtmlFromNode(isBonusRow ? children[3] : undefined),
      participants,
      winner: parseHtmlFromNode(!isBonusRow ? children[5] : children[6])
    }
  })
}

export { parseRows }
