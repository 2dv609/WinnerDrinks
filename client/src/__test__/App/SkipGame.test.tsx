import ReactDOM from 'react-dom'
import { render, fireEvent } from '@testing-library/react'
import SkipGame from '../../App/SkipGame'
import '@testing-library/jest-dom/extend-expect'
import Player from '../../model/Player'

describe('Test suite for component SkipGame', () => {
  const makeWinnerAlertMock = jest.fn((p: Player | Player[] | null, message?: string):void => {})
  const chooseRandomNewGameMock = jest.fn(():void => {})

  test('SkipGame component should use props makeWinnerAler and chooseRandomNewGame', () => {
    const div = document.createElement('div')
    ReactDOM.render(<SkipGame makeWinnerAlert={makeWinnerAlertMock} chooseRandomNewGame={chooseRandomNewGameMock} />, div)
  })

  test('A click on add user button should fire action addUser', () => {
    const { getByTestId } = render(<SkipGame makeWinnerAlert={makeWinnerAlertMock} chooseRandomNewGame={chooseRandomNewGameMock} />)

    fireEvent.click(getByTestId('skip-button'))

    expect(makeWinnerAlertMock).toBeCalledWith(null, 'Skipped.')
    expect(chooseRandomNewGameMock).toBeCalled()
  })
})
