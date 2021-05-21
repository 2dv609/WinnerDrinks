import React from 'react';
import ReactDOM from 'react-dom';
import Party from '../../../Components/Party/Party'
import { render, fireEvent } from '@testing-library/react' 
import '@testing-library/jest-dom/extend-expect'
import { getGameService, getGameModuleService } from '../../../model/ModelFactory'
import GameService from '../../../model/GameService'
import IGameModuleService from '../../../model/IGameModuleService'
import Player from '../../../model/Player'
import { playersMock, gameServiceMock } from '../mock/TestMock'

/* --------------------------------- */
/* Test cases for game module party. */
/* --------------------------------- */

describe('Test suite for game module party', () => {

    /* --------------------------------- */
    /* ----- Test cases setup ---------- */
    /* --------------------------------- */

    let gameModuleService: IGameModuleService | undefined
    let partyEvents: GameEventAPI | undefined
    
    const gameService: GameService = getGameService()
    const currentPlayers: Player[] = gameService.getPlayers(2, playersMock)
    const partyQuestionMock: IParty | ITrivia | IBackToBack = {
        _id: 'mockID',
        question: 'mockQuestion {p0} and {p1}'
    }

    beforeAll(async () => {
        gameModuleService = await getGameModuleService()

        if (gameModuleService) {
            partyEvents = gameModuleService.getPartyEvents()
        }
    })

    test('Game module party should use props gameService, gameEvent and currentPlayers', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Party currentPlayers={currentPlayers} gameService={gameServiceMock} gameEvent={partyQuestionMock}></Party>, div)
    })

    test('T1.MP.S.1: Party game events should contain at least 20 game events', () => {
        if (!partyEvents) {
            return
        }

        expect(partyEvents.questions.length >= 20).toBeTruthy()
    })

    test('T1.MP.S.2:  game events should contain only unique game events', () => {
        if (!partyEvents) {
            return
        }

        const questions: string[] = []
        
        partyEvents.questions.forEach((event: IParty | ITrivia | IBackToBack ) => {
            questions.push(event.question)
        })

        expect(questions.length === new Set(questions).size).toBeTruthy()
    })

    test('T1.MP.S.3: Party game events should not have more than 60 words', () => {
        if (!partyEvents) {
            return
        }

        partyEvents.questions.forEach((event: IParty | ITrivia | IBackToBack ) => {
            expect(event.question.split(' ').length <= 60).toBeTruthy()
        })
    })


    test('T1.MP.UI.1: Party game events should contain 2 active game participants names', () => {
        if (!partyEvents) {
            return
        }

        const questions: string[] = []
        
        partyEvents.questions.forEach((event: IParty | ITrivia | IBackToBack ) => {
            questions.push(event.question)
        })

        expect(isPlayersIncludedInGameEvent(questions)).toBeTruthy()
    })

    test('T1.MP.UI.2: Game module party should display a party game event', () => {
        const { getByTestId } = render(<Party currentPlayers={currentPlayers} gameService={gameServiceMock} gameEvent={partyQuestionMock}></Party>)
        expect(getByTestId('game-event')).toHaveTextContent(addPlayerToGameEvent(partyQuestionMock.question, currentPlayers))
        expect(getByTestId('button-0')).toHaveTextContent(currentPlayers[0].name)
        expect(getByTestId('button-1')).toHaveTextContent(currentPlayers[1].name)
    })

    test('T1.MP.UI.3: Select a party event winner should trigger transition to next game round, button 0', () => {
        const { getByTestId } = render(<Party currentPlayers={currentPlayers} gameService={gameServiceMock} gameEvent={partyQuestionMock}></Party>)
        
        const addScoreSpy = jest.spyOn(gameServiceMock, 'addScore')
        const makeWinnerAlertSpy = jest.spyOn(gameServiceMock, 'makeWinnerAlert')
        const chooseNewRandomGameSpy = jest.spyOn(gameServiceMock, 'chooseRandomNewGame')
        
        fireEvent.click(getByTestId('button-0'))
        expect(addScoreSpy).toBeCalled()
        expect(makeWinnerAlertSpy).toBeCalled()
        expect(chooseNewRandomGameSpy).toBeCalled()
    })

    test('T1.MP.UI.3: Select a party event winner should trigger transition to next game round, button 1', () => {
        const { getByTestId } = render(<Party currentPlayers={currentPlayers} gameService={gameServiceMock} gameEvent={partyQuestionMock}></Party>)
        
        const addScoreSpy = jest.spyOn(gameServiceMock, 'addScore')
        const makeWinnerAlertSpy = jest.spyOn(gameServiceMock, 'makeWinnerAlert')
        const chooseNewRandomGameSpy = jest.spyOn(gameServiceMock, 'chooseRandomNewGame')
        
        fireEvent.click(getByTestId('button-1'))
        expect(addScoreSpy).toBeCalled()
        expect(makeWinnerAlertSpy).toBeCalled()
        expect(chooseNewRandomGameSpy).toBeCalled()
    })
})

/* --------------------------------- */
/* ----- Test help functions ------- */
/* --------------------------------- */

function addPlayerToGameEvent(question: string, currentPlayers: Player[]): string {
    return question.replace(/{p0}/g, currentPlayers[0].name).replace(/{p1}/g, currentPlayers[1].name)
}

function isPlayersIncludedInGameEvent(questions: string[]): boolean {
    
    return questions.every((question: string) => question.includes('{p0}') && question.includes('{p1}'))
}
