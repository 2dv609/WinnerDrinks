export default interface IUtilService {
    
    getTrivia(): Promise<GameEventAPI | undefined>

    getParty(): Promise<GameEventAPI | undefined>

    getBackToBack(): Promise<GameEventAPI | undefined>
}