import React from 'react';
import ReactDOM from 'react-dom';
import Party from '../../../Components/Party/Party'
import { gamePropsMock } from '../mock/mock'
import { render, cleanup } from '@testing-library/react' 
import '@testing-library/jest-dom/extend-expect'
import renderer from 'react-test-renderer'
import Player from '../../../Player'

/* --------------------------------- */
/* ----- Test cases setup ---------- */
/* --------------------------------- */

afterEach(cleanup)

/* --------------------------------- */
/* Test cases for game module party. */
/* --------------------------------- */

test('Game module should use common interface', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Party gp={gamePropsMock} gameEvent={gameEventMock}></Party>, div)
})

test('Game module party should display a party game event', () => {
    const { getByTestId } = render(<Party gp={gamePropsMock} gameEvent={gameEventMock}></Party>)
    expect(getByTestId('game-event')).toHaveTextContent(addPlayerToGameEvent(gameEventMock))
})

test('Party game events should contain 2 active game participants names', () => {
    const { getByTestId } = render(<Party gp={gamePropsMock} gameEvent={gameEventMock}></Party>)
    const gameEvent: string | null = getByTestId('game-event').textContent
    const players: Player[] = gamePropsMock.getPlayers(2)
    expect(isPlayerNamesIncludedInGameEvent(players, gameEvent)).toBeTruthy()
})

/* test('temp', () => {
    const { getByTestId } = render(<Party gp={gamePropsMock} gameEvent={gameEventMock}></Party>)
    const gameEvent: string | null = getByTestId('game-event').textContent
    const players: Player[] = gamePropsMock.getPlayers(2)
    expect(isPlayerNamesIncludedInGameEvent(players, gameEvent)).toBeTruthy()
}) */

test('Game module should match snapshot', () => {
    const tree = renderer.create(<Party gp={gamePropsMock} gameEvent={gameEventMock}></Party>).toJSON()
    expect(tree).toMatchSnapshot()
})


/* --------------------------------- */
/* ---- Help functions and mock ---- */
/* --------------------------------- */

function addPlayerToGameEvent(gameEvent: any): string {
    const gameEventQuestion: string = gameEvent.question
    return gameEventQuestion.replace('{players[0]}', `${gamePropsMock.getPlayers(1)[0]}`).replace('{players[1]}', `${gamePropsMock.getPlayers(1)[1]}`)
}

function isPlayerNamesIncludedInGameEvent(players: Player[], gameEvent: string | null): boolean {
    if (!gameEvent) {
        return false
    }
    return players.every((player: Player) => gameEvent.includes(player.name))
}

const gameEventMock = {
    _id: 111,
    question: 'This is a party mock question {players[0]} {players[1]}'
}