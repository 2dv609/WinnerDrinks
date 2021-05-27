import { GameMode } from '../model/GameMode'

/**
 * Component displaying a game mode button.
 */

type GameModeButtonProps = {
  changeGameMode: (name: GameMode) => void,
}

const GameModeButton: React.FC<GameModeButtonProps> = ({ changeGameMode }) => {
  const keyStandard: number = 1
  const keyScoreboard: number = 2

  const handleGameMode = (event: React.ChangeEvent<HTMLSelectElement>) : void => {
    // eslint-disable-next-line no-unused-expressions
    event.target.value === 'Standard' ? changeGameMode(GameMode.STANDARD) : changeGameMode(GameMode.HIGHSCORE)
  }

  return (
    <div className="control select is-multiple">
      <select name="gamemode" id="gamemode" onChange={handleGameMode}>
        <option value="Standard" key={keyStandard}>Standard</option>
        <option value="Highscore" key={keyScoreboard}>Scoreboard</option>
      </select>
      <br />
    </div>
  )
}

export default GameModeButton
