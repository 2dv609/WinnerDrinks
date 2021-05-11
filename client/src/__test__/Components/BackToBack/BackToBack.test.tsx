import React from 'react';
import ReactDOM from 'react-dom';
import BackToBack from '../../../Components/BackToBack/BackToBack'
import { gamePropsMock, gameEventMock } from '../mock/mock'
import { render, cleanup } from '@testing-library/react' 
import '@testing-library/jest-dom/extend-expect'
import renderer from 'react-test-renderer'



/* // After each cleanup
afterEach(cleanup)

// Test if component works with properties. 
it('Game module should use common interface', () => {
    const div = document.createElement('div')
    ReactDOM.render(<BackToBack gameService={gamePropsMock} gameEvent={mock}></BackToBack>, div)
})

// Test if componenet render correct gameEvent
it('Game module should render the correct game event', () => {
    const { getByTestId } = render(<BackToBack gameService={gamePropsMock} gameEvent={mock}></BackToBack>)
    expect(getByTestId('game-event')).toHaveTextContent(gameEventMock.question)
})

// Create a snapshot of the element
it('Game module should match snapshot', () => {
    const tree = renderer.create(<BackToBack gameService={gamePropsMock} gameEvent={mock}></BackToBack>).toJSON()
    expect(tree).toMatchSnapshot()
})



// Mock game event mock
const mock = {
    _id: 111,
    category: '',
    question: 'This is a party mock question {players[0]} {players[1]}',
    type: '',
    difficulty: '',
    correct_answer: '',
    incorrect_answers: [''],
    all_answers: ['']
} */