import ReactDOM from 'react-dom'
import { render, fireEvent } from '@testing-library/react'
import Login from '../../App/Login'
import '@testing-library/jest-dom/extend-expect'

describe('Test suite for component Login', () => {

    const addUserMock = jest.fn((newPlayerName: string): void => {})

    test('Login component should use props addUser', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Login addUser={addUserMock}></Login>, div)
    })

    test('A click on add user button should fire action addUser', () => {
        const { getByTestId } = render(<Login addUser={addUserMock}></Login>)
        
        fireEvent.click(getByTestId('add-user-button'))

        expect(addUserMock).toBeCalled()
    })

    test('Expect player name field value to be used when fire action addUser', () => {
        const { getByTestId } = render(<Login addUser={addUserMock}></Login>)
        const playerNameField: HTMLElement = getByTestId('player-name-field')
        
        fireEvent.change(playerNameField, { target: { value: 'MockName' } })
        fireEvent.click(getByTestId('add-user-button'))

        expect(addUserMock).toBeCalledWith('MockName')
    })
})