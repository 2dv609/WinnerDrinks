import GameModuleService from './GameModuleService'
import IGameModuleService from './IGameModuleService'
import GameService from './GameService'
import GameModule from './GameModule'
import { IGameModuleSetting } from './GameModule'
import Player from './Player'

/**
 * Factory method that return a promise of an instance
 * of a type IGameModuleSerice with loaded game events or
 * undefined if GameModules coulde not be loaded.
 *
 * @returns {Promise<IUtilservice | undefined>}
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
 * Factory method that return an object of type GameService.
 *
 * @returns {GameService}
 */
export function getGameService(): GameService {
  return new GameService()
}

/**
 * Factory method that return an object of type IGameModuleSetting.
 *
 * @returns {GameService}
 */
export function getGameModuleSettings(): IGameModuleSetting[] {
  const gameModule: GameModule = new GameModule()
  return gameModule.getSettings()
}

/**
 * Factory method that return an instance of Player.
 *
 * @param {string[]} - A player name
 * @returns {Player} - A player.
 */
export function getPlayer(name: string): Player {
  return new Player(name)
}
