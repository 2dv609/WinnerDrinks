import ReactDOM from 'react-dom'
import { render } from '@testing-library/react'
import Scoreboard from '../../App/Scoreboard'
import '@testing-library/jest-dom/extend-expect'
import Player from '../../model/Player'
import { createPlayerName } from '../Common/TestHelpFunctions'

describe('Test suite for component Scoreboard', () => {
  const players: Player[] = []
  const message: string = 'mockMessage'

  beforeEach(() => {
    players.push(
      new Player(createPlayerName(3)),
      new Player(createPlayerName(4)),
      new Player(createPlayerName(5)),
      new Player(createPlayerName(6)),
      new Player(createPlayerName(7)),
    )

    players.forEach((player: Player): void => {
      player.score = 1000
    })
  })

  test('Scoreboard component should use props players and message', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Scoreboard players={players} message={message} />, div)
  })

  test('Scoreboard should display player names:scores', () => {
    const { getByTestId } = render(<Scoreboard players={players} message={message} />)

    players.forEach((player: Player, index: number): void => {
      expect(getByTestId(`scoreboard-row-${index}`)).toHaveTextContent(`${player.name}:${player.score}`)
    })
  })
})
