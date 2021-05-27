/**
 * Common used test help functions.
 */

/**
 * Create a player's name with a specific length decided by the
 * argument lengthName.
 *
 * @param {number} lengthName - An number.
 * @returns {string} - A random name.
 */
export const createPlayerName = (lengthName: number): string => {
  return Math.random().toString(36).substring(0, lengthName)
}

/**
 * Test if game event is include in a gameEventApi
 *
 * @param {number} gameEventApi - A gameEventApi.
 * @param {number} lengthName - An game event.
 * @returns {string} - True if game event is included in gameEventApi.
 */
export const isGameEventIncluded = (gameEventApi: GameEventAPI, gameEvent: IBackToBack | IParty | ITrivia): boolean => {
  let isIncluded = false

  gameEventApi.questions.forEach((event: IBackToBack | IParty | ITrivia) => {
    if (event === gameEvent) {
      isIncluded = true
    }
  })

  return isIncluded
}
