/**
 * Interface for the the utility service. 
 */
export default interface IUtilService {

    getGameEvents(gameModule: string): Promise<GameEventAPI | undefined>
}