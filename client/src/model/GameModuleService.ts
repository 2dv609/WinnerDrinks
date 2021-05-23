import IUtilService from '../util/IUtilService'
import getUtilService from '../util/UtilServiceFactory'
import GameModule from './GameModule'
import IGameModuleService from './IGameModuleService'

/**
 * Class containing methods to get game events for 
 * specific game modules.
 * 
 * @implements IGameModuleService
 */
export default class GameModuleService implements IGameModuleService {

    // Data game events
    private triviaEvents: GameEventAPI | undefined
    private partyEvents: GameEventAPI | undefined
    private backToBackEvents: GameEventAPI | undefined
 
    /**
     * Load game events for game modules.
     * 
     * @return {Promise<void>}
     */
    public async loadGameEvents(): Promise<boolean> {
        const gameModule = new GameModule()
        const utilsService: IUtilService = await getUtilService(gameModule.getNames())

        return Promise.all([
            utilsService.getGameEvents(gameModule.TRIVIA), 
            utilsService.getGameEvents(gameModule.PARTY), 
            utilsService.getGameEvents(gameModule.BACK_TO_BACK)])
        .then((response) => {
            this.triviaEvents = response[0]
            this.partyEvents = response[1]
            this.backToBackEvents = response[2]
            return true
        })
        .catch((error) => {
            return false
        })
    }

    /**
     * Method that returns the game events for game module trivia.
     * 
     * @returns {GameEventAPI | undefined}
     */
    public getTriviaEvents(): GameEventAPI | undefined {
        return this.triviaEvents
    }
    
    /**
     * Method that returns the game events for game module party.
     * 
     * @returns {GameEventAPI | undefined}
     */
    public getPartyEvents(): GameEventAPI | undefined {
        return this.partyEvents
    }

    /**
     * Method that returns the game events for game module back-to-back.
     * 
     * @returns {GameEventAPI | undefined}
     */
    public getBackToBackEvents(): GameEventAPI | undefined {
        return this.backToBackEvents
    }
}
