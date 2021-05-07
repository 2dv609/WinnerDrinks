import React from 'react';
import ReactDOM from 'react-dom';
import BackToBack from '../../../Components/BackToBack/BackToBack'
import { gamePropsMock, gameEventMock } from '../mock/mock'
import { render, cleanup } from '@testing-library/react' 
import '@testing-library/jest-dom/extend-expect'
import renderer from 'react-test-renderer'


// After each cleanup
afterEach(cleanup)

// Test if component do not crashes with common interface. 
it('Game module should use common interface', () => {
    const div = document.createElement('div')
    ReactDOM.render(<BackToBack gp={gamePropsMock} gameEvent={gameEventMock}></BackToBack>, div)
})

// Test if componenet render correct gameEvent
it('Game module should render the correct game event', () => {
    const { getByTestId } = render(<BackToBack gp={gamePropsMock} gameEvent={gameEventMock}></BackToBack>)
    expect(getByTestId('game-event')).toHaveTextContent(gameEventMock.question)
})

// Create a snapshot of the element
it('Game module should match snapshot', () => {
    const tree = renderer.create(<BackToBack gp={gamePropsMock} gameEvent={gameEventMock}></BackToBack>).toJSON()
    expect(tree).toMatchSnapshot()
})
