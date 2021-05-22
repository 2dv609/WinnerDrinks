import GameModuleService from './GameModuleService'
import IGameModuleService from './IGameModuleService'
import GameService from './GameService'
import { IGameModuleSetting } from '../Components/Menu/Navbar'

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

export function getGameModuleSettings(): IGameModuleSetting[] {
    
    return [
        { name: 'Wheel', enable: true, active: true, index: 0 },
        { name: 'Party', enable: true, active: true, index: 1 },
        { name: 'BackToBack', enable: false, active: false, index: 2 },
        { name: 'Trivia', enable: true, active: true, index: 3 },
    ]
}
