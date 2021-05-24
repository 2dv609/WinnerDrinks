import { GameModuleProps } from '../../../Components/GameModuleProps'
import Player from '../../../model/Player'

export const playersMock: Player[] = [new Player('Tom'), new Player('Carl'), new Player('Sandra')]

const makeWinnerAlertMock = (p: Player | Player[] | null, message?: string): void => {}
const chooseRandomNewGameMock = (): void => {}
const removeGameEventMock = (gameEventId: string, gameEvents: GameEventAPI): void => {}
const getPlayersMock = (amount: number, players: Player[]): Player[] => {return players}
const addScoreMock = (p: Player) => void {}


export const gameServiceMock: GameModuleProps = {
    players: playersMock,
    getPlayers: getPlayersMock,
    addScore: addScoreMock,
    makeWinnerAlert: makeWinnerAlertMock,
    chooseRandomNewGame: chooseRandomNewGameMock,
    removeGameEvent: removeGameEventMock        
}
