import ReactDOM from 'react-dom'
import BackToBack from '../../../Components/BackToBack/BackToBack'
import { render, fireEvent } from '@testing-library/react' 
import '@testing-library/jest-dom/extend-expect'
import { getGameService } from '../../../model/ModelFactory'
import GameService from '../../../model/GameService'
import Player from '../../../model/Player'
import { playersMock, gameServiceMock } from '../mock/TestMock'
import fs from 'fs-extra'
import { join } from 'path'

/* --------------------------------- */
/* Test cases for game module party. */
/* --------------------------------- */

describe('Test suite for game module back to back', () => {

    /* --------------------------------- */
    /* ----- Test cases setup ---------- */
    /* --------------------------------- */

    type RawBackToBackEvent = {
        question: string
    }

    let backToBackEvents: RawBackToBackEvent[]
    
    const gameService: GameService = getGameService()
    const currentPlayers: Player[] = gameService.getPlayers(2, playersMock)
    const backToBackQuestionMock: IParty | ITrivia | IBackToBack = {
        _id: 'mockID',
        question: 'mockQuestion'
    }

    beforeAll(async () => {
        const backToBackEventsPath: string = join( __dirname, '../../../../../server/data/back-to-back.json')
        backToBackEvents = await fs.readJson(backToBackEventsPath)
    })

    test('Game module back to back should use props gameService, gameEvent and currentPlayers', () => {
        const div = document.createElement('div')
        ReactDOM.render(<BackToBack currentPlayers={currentPlayers} gameService={gameServiceMock} gameEvent={backToBackQuestionMock}></BackToBack>, div)
    })

    test.skip('T1.MBB.S.1: Back to back game events should contain at least 20 game events', () => {
        if (!backToBackEvents) {
            return
        }

        expect(backToBackEvents.length >= 20).toBeTruthy()
    })

    test('T1.MBB.S.2: Back to back game events should contain only unique game events', () => {
        if (!backToBackEvents) {
            return
        }

        const questions: string[] = []
        
        backToBackEvents.forEach((event: RawBackToBackEvent): void => {
            questions.push(event.question)
        })

        expect(questions.length === new Set(questions).size).toBeTruthy()
    })

    test('T1.MBB.S.3: Back to back game events should not have more than 60 words', () => {
        if (!backToBackEvents) {
            return
        }

        backToBackEvents.forEach((event: RawBackToBackEvent ): void => {
            expect(event.question.split(' ').length <= 60).toBeTruthy()
        })
    })


    test('T1.MBB.UI.1: Back to back game events should contain 2 active game participants names', () => {
        const { getByTestId } = render(<BackToBack currentPlayers={currentPlayers} gameService={gameServiceMock} gameEvent={backToBackQuestionMock}></BackToBack>)
        const textContentCurrentPlayers: string | null = getByTestId('current-players').textContent

        expect(isPlayersIncludedInGameEvent(textContentCurrentPlayers, currentPlayers)).toBeTruthy()
    })

    
    test('T1.MBB.UI.2: Game module back to back should display a back to back game event', () => {
        const { getByTestId } = render(<BackToBack currentPlayers={currentPlayers} gameService={gameServiceMock} gameEvent={backToBackQuestionMock}></BackToBack>)
        expect(getByTestId('game-event')).toHaveTextContent(backToBackQuestionMock.question)
        expect(getByTestId('button-correct')).toHaveTextContent('They were correct!')
        expect(getByTestId('button-incorrect')).toHaveTextContent('They were wrong!')
    })

    test('T1.MBB.UI.3: Select back to back events result should trigger transition to next game round, button correct', () => {
        const { getByTestId } = render(<BackToBack currentPlayers={currentPlayers} gameService={gameServiceMock} gameEvent={backToBackQuestionMock}></BackToBack>)
        
        const addScoreSpy = jest.spyOn(gameServiceMock, 'addScore')
        const makeWinnerAlertSpy = jest.spyOn(gameServiceMock, 'makeWinnerAlert')
        const chooseNewRandomGameSpy = jest.spyOn(gameServiceMock, 'chooseRandomNewGame')
        
        fireEvent.click(getByTestId('button-correct'))

        expect(addScoreSpy).toBeCalledTimes(2)
        expect(makeWinnerAlertSpy).toBeCalled()
        expect(chooseNewRandomGameSpy).toBeCalled()
    })

    test('T1.MBB.UI.3: Select back to back events result should trigger transition to next game round, button incorrect', () => {
        const { getByTestId } = render(<BackToBack currentPlayers={currentPlayers} gameService={gameServiceMock} gameEvent={backToBackQuestionMock}></BackToBack>)
        
        const makeWinnerAlertSpy = jest.spyOn(gameServiceMock, 'makeWinnerAlert')
        const chooseNewRandomGameSpy = jest.spyOn(gameServiceMock, 'chooseRandomNewGame')
        
        fireEvent.click(getByTestId('button-incorrect'))
        
        expect(makeWinnerAlertSpy).toBeCalled()
        expect(chooseNewRandomGameSpy).toBeCalled()
    })
})

/* --------------------------------- */
/* ----- Test help functions ------- */
/* --------------------------------- */

function isPlayersIncludedInGameEvent(textContentCurrentPlayers: string | null, currentPlayers: Player[]): boolean {    
    if (!textContentCurrentPlayers) {
        return false
    }

    return currentPlayers.every((player: Player) => textContentCurrentPlayers.includes(player.name))
}
