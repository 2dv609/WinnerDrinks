import React from 'react';
import ReactDOM from 'react-dom';
import Party from '../../../Components/Party/Party'
import { gamePropsMock, gameEventMock } from '../mock/mock'
import { render, cleanup } from '@testing-library/react' 
import '@testing-library/jest-dom/extend-expect'
import renderer from 'react-test-renderer'


// After each cleanup
afterEach(cleanup)

// Test if component do not crashes with common interface. 
it('Game module should use common interface', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Party gp={gamePropsMock} gameEvent={gameEventMock}></Party>, div)
})

// Test if componenet render correct gameEvent
it('Game module should render the correct game event', () => {
    const { getByTestId } = render(<Party gp={gamePropsMock} gameEvent={gameEventMock}></Party>)
    expect(getByTestId('game-event')).toHaveTextContent(addPlayerToGameEvent(gameEventMock))
})

// Create a snapshot of the element
it('Game module should match snapshot', () => {
    const tree = renderer.create(<Party gp={gamePropsMock} gameEvent={gameEventMock}></Party>).toJSON()
    expect(tree).toMatchSnapshot()
})

// Helper function
function addPlayerToGameEvent(gameEvent: any): string {
    const gameEventQuestion: string = gameEvent.question
    return gameEventQuestion.replace('{players[0]}', `${gamePropsMock.getPlayers(1)[0]}`).replace('{players[1]}', `${gamePropsMock.getPlayers(1)[1]}}`)
}