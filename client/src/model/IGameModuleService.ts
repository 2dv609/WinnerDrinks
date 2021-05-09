export default interface IGameModuleService {

    loadGameEvents(): Promise<void>
    
    getTriviaEvents(): GameEventAPI | undefined

    getPartyEvents(): GameEventAPI | undefined

    getBackToBackEvents(): GameEventAPI | undefined
}