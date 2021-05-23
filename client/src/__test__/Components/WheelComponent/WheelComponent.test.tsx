import ReactDOM from 'react-dom'
import WheelComponent from '../../../Components/WheelComponent/WheelComponent'
import { render, fireEvent } from '@testing-library/react' 
import '@testing-library/jest-dom/extend-expect'
import { getGameService } from '../../../model/ModelFactory'
import GameService from '../../../model/GameService'
import Player from '../../../model/Player'
import { playersMock, gameServiceMock } from '../mock/TestMock'

/* --------------------------------- */
/* Test cases for game module party. */
/* --------------------------------- */

describe('Test suite for game module spin the wheel.', () => {

    /* --------------------------------- */
    /* ----- Test cases setup ---------- */
    /* --------------------------------- */

    const gameService: GameService = getGameService()
    const currentPlayers: Player[] = gameService.getPlayers(2, playersMock)
    

    test('Game module Spin the Wheel should use props gameService and currentPlayers', () => {
        const div = document.createElement('div')
        ReactDOM.render(<WheelComponent currentPlayers={currentPlayers} gameService={gameServiceMock}></WheelComponent>, div)
    })

    test('T1.MSW.S.1: Spin the wheel animation should not be longer than 7 seconds', () => {
        
    })


    test('T1.MSW.UI.1: Wheel section content should follow rules, 2 active game participants', () => {
        const player1: Player = new Player('Tom')
        const player2: Player = new Player('Carl')

        const currentPlayersMock: Player[] = [player1, player2, player1, player2]       
        const { getByTestId } = render(<WheelComponent currentPlayers={currentPlayersMock} gameService={gameServiceMock}></WheelComponent>)
      
        const textContentWheel: (string | null)[] = [
            getByTestId('wheel-section-0').textContent,
            getByTestId('wheel-section-1').textContent,
            getByTestId('wheel-section-2').textContent,
            getByTestId('wheel-section-3').textContent
        ]

        expect(countPlayerNameOccurences(textContentWheel, player1.name) === 2).toBeTruthy()
        expect(countPlayerNameOccurences(textContentWheel, player2.name) === 2).toBeTruthy()
    })

    test('T1.MSW.UI.1: Wheel section content should follow rules, 3 active game participants', () => {
        const player1: Player = new Player('Tom')
        const player2: Player = new Player('Carl')
        const player3: Player = new Player('Lisa')

        const currentPlayersMock: Player[] = [player1, player2, player3, player1]       
        const { getByTestId } = render(<WheelComponent currentPlayers={currentPlayersMock} gameService={gameServiceMock}></WheelComponent>)
      
        const textContentWheel: (string | null)[] = [
            getByTestId('wheel-section-0').textContent,
            getByTestId('wheel-section-1').textContent,
            getByTestId('wheel-section-2').textContent,
            getByTestId('wheel-section-3').textContent
        ]

        expect(countPlayerNameOccurences(textContentWheel, player1.name) === 2).toBeTruthy()
        expect(countPlayerNameOccurences(textContentWheel, player2.name) === 1).toBeTruthy()
        expect(countPlayerNameOccurences(textContentWheel, player3.name) === 1).toBeTruthy()
    })

    test('T1.MSW.UI.1: Wheel section content should follow rules, 4-10 active game participants', () => {
        const player1: Player = new Player('Tom')
        const player2: Player = new Player('Carl')
        const player3: Player = new Player('Lisa')
        const player4: Player = new Player('Sara')

        const currentPlayersMock: Player[] = [player1, player2, player3, player4]       
        const { getByTestId } = render(<WheelComponent currentPlayers={currentPlayersMock} gameService={gameServiceMock}></WheelComponent>)
      
        const textContentWheel: (string | null)[] = [
            getByTestId('wheel-section-0').textContent,
            getByTestId('wheel-section-1').textContent,
            getByTestId('wheel-section-2').textContent,
            getByTestId('wheel-section-3').textContent
        ]

        expect(countPlayerNameOccurences(textContentWheel, player1.name) === 1).toBeTruthy()
        expect(countPlayerNameOccurences(textContentWheel, player2.name) === 1).toBeTruthy()
        expect(countPlayerNameOccurences(textContentWheel, player3.name) === 1).toBeTruthy()
        expect(countPlayerNameOccurences(textContentWheel, player4.name) === 1).toBeTruthy()
    })
})

/* --------------------------------- */
/* ----- Test help functions ------- */
/* --------------------------------- */

const countPlayerNameOccurences = (textContentWheel: (string | null)[], playerName: string): number => {
    let occurrences = 0

    textContentWheel.forEach((sectionTextContent: string | null) => {
        if (sectionTextContent === playerName) {
            occurrences++
        }
    })
    return occurrences
}
