/**
 * Interface for the the game module service.
 */
export default interface IGameModuleService {

    /**
     * Load game events
     */
    loadGameEvents(): Promise<boolean>

    /**
     * Method that returns the game events for game module trivia.
     *
     * @returns {GameEventAPI | undefined}
     */
    getTriviaEvents(): GameEventAPI | undefined

    /**
     * Method that returns the game events for game module trivia.
     *
     * @returns {GameEventAPI | undefined}
     */
    getPartyEvents(): GameEventAPI | undefined

    /**
     * Method that returns the game events for game module trivia.
     *
     * @returns {GameEventAPI | undefined}
     */
    getBackToBackEvents(): GameEventAPI | undefined
}
