import React from 'react';
import ReactDOM from 'react-dom';
import Party from '../../../Components/Party/Party'
import { render, cleanup, fireEvent } from '@testing-library/react' 
import '@testing-library/jest-dom/extend-expect'
import renderer from 'react-test-renderer'
import { getGameService } from '../../../model/ModelFactory'
import GameService from '../../../model/GameService'
import { GameModuleProps } from '../../../Components/GameModuleProps'
import Player from '../../../model/Player'

/* --------------------------------- */
/* Test cases for game module party. */
/* --------------------------------- */

describe('Party test', () => {

    /* --------------------------------- */
    /* ----- Test cases setup ---------- */
    /* --------------------------------- */

    const players: Player[] = []
    let gameService: GameService
    let gameModuleProps: GameModuleProps
    const makeWinnerAlertMock = (p: Player | Player[] | null, message?: string): void => {
        console.log('makeWinnerAlertMock')
    }
    const chooseRandomNewGameMock = (): void => {
        console.log('chooseRandomNewGameMock')
    }
    const removeGameEventMock = (gameEventId: string, gameEvents: GameEventAPI): void => {}
    let currentPlayers: Player[] = []
    const currentQuestionMock: IParty = {
        _id: 'mockID',
        question: 'mockQuestion {p0} and {p1}'
    } 

    beforeAll(() => {
        gameService = getGameService()
        players.push(new Player('Tom'), new Player('Carl'), new Player('Sandra'))
        currentPlayers = gameService.getPlayers(2, players)  
        gameModuleProps = {
        players: players,
        getPlayers: gameService.getPlayers,
        addScore: gameService.addScore,
        makeWinnerAlert: makeWinnerAlertMock,
        chooseRandomNewGame: chooseRandomNewGameMock,
        removeGameEvent: removeGameEventMock
      }
    })

    afterEach(cleanup)

    test('Game module props should use props gameService, gameEvent and currentPlayers', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Party currentPlayers={currentPlayers} gameService={gameModuleProps} gameEvent={currentQuestionMock}></Party>, div)
    })

    test('T1.MP.UI.1: Game module party should display a party game event', () => {
        const { getByTestId } = render(<Party currentPlayers={currentPlayers} gameService={gameModuleProps} gameEvent={currentQuestionMock}></Party>)
        expect(getByTestId('game-event')).toHaveTextContent(addPlayerToGameEvent(currentQuestionMock.question, currentPlayers))
        expect(getByTestId('button-0')).toHaveTextContent(currentPlayers[0].name)
        expect(getByTestId('button-1')).toHaveTextContent(currentPlayers[1].name)
    })

    test('T1.MP.UI.2: Party game events should contain 2 active game participants names', () => {
        const { getByTestId } = render(<Party currentPlayers={currentPlayers} gameService={gameModuleProps} gameEvent={currentQuestionMock}></Party>)
        const gameEvent: string | null = getByTestId('game-event').textContent
        expect(isPlayerNamesIncludedInGameEvent(currentPlayers, gameEvent)).toBeTruthy()
    })

    test('T1.MP.UI.3: A user should be able to select a party game event winner, button 0', () => {
        const { getByTestId } = render(<Party currentPlayers={currentPlayers} gameService={gameModuleProps} gameEvent={currentQuestionMock}></Party>)
        
        const addScoreSpy = jest.spyOn(gameModuleProps, 'addScore')
        const makeWinnerAlertSpy = jest.spyOn(gameModuleProps, 'makeWinnerAlert')
        const chooseNewRandomGameSpy = jest.spyOn(gameModuleProps, 'chooseRandomNewGame')
        
        fireEvent.click(getByTestId('button-0'))
        expect(addScoreSpy).toBeCalled()
        expect(makeWinnerAlertSpy).toBeCalled()
        expect(chooseNewRandomGameSpy).toBeCalled()
    })

    test('T1.MP.UI.3: A user should be able to select a party game event winner, button 1', () => {
        const { getByTestId } = render(<Party currentPlayers={currentPlayers} gameService={gameModuleProps} gameEvent={currentQuestionMock}></Party>)
        
        const addScoreSpy = jest.spyOn(gameModuleProps, 'addScore')
        const makeWinnerAlertSpy = jest.spyOn(gameModuleProps, 'makeWinnerAlert')
        const chooseNewRandomGameSpy = jest.spyOn(gameModuleProps, 'chooseRandomNewGame')
        
        fireEvent.click(getByTestId('button-1'))
        expect(addScoreSpy).toBeCalled()
        expect(makeWinnerAlertSpy).toBeCalled()
        expect(chooseNewRandomGameSpy).toBeCalled()
    })

    test('Game module tree should match snapshot', () => {
        const tree = renderer.create(<Party currentPlayers={currentPlayers} gameService={gameModuleProps} gameEvent={currentQuestionMock}></Party>).toJSON()
        expect(tree).toMatchSnapshot()
    })
})

/* --------------------------------- */
/* ----- Test help functions ------- */
/* --------------------------------- */

function addPlayerToGameEvent(question: string, currentPlayers: Player[]): string {
    return question.replace('{p0}', currentPlayers[0].name).replace('{p1}', `${currentPlayers[1].name}`)
}

function isPlayerNamesIncludedInGameEvent(players: Player[], gameEvent: string | null): boolean {
    if (!gameEvent) {
        return false
    }
    return players.every((player: Player) => gameEvent.includes(player.name))
}
