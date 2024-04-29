import { BONUS_SEASON_START_INDEX } from '../util/constants.js'

const getParticipantsIndex = (index, rowsLength) => {
  if (index === rowsLength - 1) return 6

  return index >= BONUS_SEASON_START_INDEX ? 5 : 4
}

export { getParticipantsIndex }
