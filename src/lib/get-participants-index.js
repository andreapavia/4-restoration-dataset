const { BONUS_SEASON_START_INDEX } = require('../util/constants')

const getParticipantsIndex = (index, rowsLength) => {
  if (index === rowsLength - 1) return 6

  return index >= BONUS_SEASON_START_INDEX ? 5 : 4
}

module.exports = {
  getParticipantsIndex
}
