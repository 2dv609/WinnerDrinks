import IUtilService from '../util/IUtilService'
import getUtilService from '../util/UtilServiceFactory'
import { GameModuleName } from '../util/GameModuleName'
import IGameModuleService from './IGameModuleService'

/**
 * Class containing handy methods for the Game Modules.
 */
export default class GameModuleService implements IGameModuleService {

    // Data game events
    private triviaEvents: GameEventAPI | undefined
    private partyEvents: GameEventAPI | undefined
    private backToBackEvents: GameEventAPI | undefined
 
    public async loadGameEvents(): Promise<void> {
        const utilsService: IUtilService = await getUtilService()

        Promise.all([
            utilsService.getGameEvents(GameModuleName.TRIVIA), 
            utilsService.getGameEvents(GameModuleName.PARTY), 
            utilsService.getGameEvents(GameModuleName.BACK_TO_BACK)])
        .then((response) => {
            this.triviaEvents = response[0]
            this.partyEvents = response[1]
            this.backToBackEvents = response[2]
        })
    }

    public getTriviaEvents(): GameEventAPI | undefined {
        return this.triviaEvents
    }
    
    public getPartyEvents(): GameEventAPI | undefined {
        return this.partyEvents
    }

    public getBackToBackEvents(): GameEventAPI | undefined {
        return this.backToBackEvents
    }
}
