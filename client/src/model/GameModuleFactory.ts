import GameModuleService from './GameModuleService'
import IGameModuleService from './IGameModuleService'

export default async function getGameModuleService(): Promise<IGameModuleService> {
    const gameModuleSerivce: IGameModuleService = new GameModuleService()
    await gameModuleSerivce.loadGameEvents()
    return gameModuleSerivce
}