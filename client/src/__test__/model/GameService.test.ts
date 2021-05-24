import GameService from '../../model/GameService'
import { getGameService, getGameModuleSettings } from '../../model/ModelFactory'
import Player from '../../model/Player'
import WheelComponent from '../../Components/WheelComponent/WheelComponent'
import Party from '../../Components/Party/Party'
import { createPlayerName, isGameEventIncluded } from '../Common/TestHelpFunctions'

describe('Test suite for class model/GameService.ts', () => {

    /* --------------------------------- */
    /* ----- Test cases setup ---------- */
    /* --------------------------------- */

    const gameService: GameService = getGameService()
    const mockPlayers: Player[] = []
    const gameModules = [WheelComponent, Party];
    const gameEventAPIMock: GameEventAPI = {
        questions: [
            {
                _id: 'mockID_1',
                question: 'mockQuestion 1'
            },
            {
                _id: 'mockID_2',
                question: 'mockQuestion 2'
            },
            {
                _id: 'mockID_3',
                question: 'mockQuestion 3'
            },
            {
                _id: 'mockID_4',
                question: 'mockQuestion 4'
            }
        ]
    }

    beforeEach(() => {
        mockPlayers.push(
            new Player(createPlayerName(3)),
            new Player(createPlayerName(2)),
            new Player(createPlayerName(4)),
            new Player(createPlayerName(5)),
            new Player(createPlayerName(6))
        )
    })

    /* --------------------------------- */
    /* ---------- Test cases  ---------- */
    /* --------------------------------- */

    test('Method addScore should add one point to a player\'s total score', () => {
        const mockPlayer = new Player(createPlayerName(4))
        gameService.addScore(mockPlayer)
        expect(mockPlayer.score === 1).toBeTruthy()
    })

    test('Method newGameIndex should return a new game index', () => {
        const currentGameIndex = 1
        const newGameIndex = gameService.getNewGameIndex(currentGameIndex, gameModules, getGameModuleSettings())
        expect(currentGameIndex === newGameIndex).toBeFalsy()
    })

    test('Method getPlayers should return a list of players with length determined by the parameter nrOfPlayers value.', () => {
        const nrOfPlayers = 2
        const players = gameService.getPlayers(nrOfPlayers, mockPlayers)
        expect(players.length === nrOfPlayers).toBeTruthy()
    })

    test('Method getRandomGameEvent should return one random game event.', () => {
        const gameEvent: IBackToBack | IParty | ITrivia = gameService.getRandomGameEvent(gameEventAPIMock)
        console.log(gameEvent)
        expect(isGameEventIncluded(gameEventAPIMock, gameEvent)).toBeTruthy()
    })
})
