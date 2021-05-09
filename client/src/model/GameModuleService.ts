import IUtilService from '../util/IUtilService'
import getUtilService from './UtilServiceFactory'
import IGameModuleService from './IGameModuleService'

export default class GameModuleService implements IGameModuleService {

    private triviaEvents: GameEventAPI | undefined
    private partyEvents: GameEventAPI | undefined
    private backToBackEvents: GameEventAPI | undefined

    public async loadGameEvents(): Promise<void> {
        const utilsService: IUtilService = await getUtilService()

        Promise.all([utilsService.getTrivia(), utilsService.getParty(), utilsService.getBackToBack()])
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