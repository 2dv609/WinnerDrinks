import GameModuleService from './GameModuleService'
import IGameModuleService from './IGameModuleService'
import GameService from './GameService'

/**
 * Factory method that return a promise of an instance 
 * of a type IGameModuleSerice with loaded game events or
 * undefined if GameModules coulde not be loaded.
 * 
 * @returns {Promis<IUtilservice | undefined>}
 */
export async function getGameModuleService(): Promise<IGameModuleService | undefined> {

    const gameModuleSerivce: IGameModuleService = new GameModuleService()
    const gameEventIsLoaded: boolean = await gameModuleSerivce.loadGameEvents()

    if (!gameEventIsLoaded) {
        return
    }

    return gameModuleSerivce
}

/**
 * Factory method that return  an instance 
 * of a type IGameService.
 * 
 * @returns {GameService}
 */
 export function getGameService(): GameService {
    return new GameService()
}