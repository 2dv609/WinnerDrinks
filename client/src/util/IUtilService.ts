/**
 * Interface for the the utility service. 
 */
export default interface IUtilService {

    /**
     * Method that returns a promise of the game events for a specific game module
     * determined by the name of the game module.
     * 
     * @param {string} gameModule - The name of the game module. 
     */
    getGameEvents(gameModule: string): Promise<GameEventAPI | undefined>
}