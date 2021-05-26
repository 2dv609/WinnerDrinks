import { GameMode } from '../model/GameMode'
import { v1 as uuidv1 } from 'uuid'

/**
 * Component displaying a game mode nutton.
 */

type GameModeButtonProps = {
  changeGameMode: (name: GameMode) => void,
}

const GameModeButton: React.FC<GameModeButtonProps> = ({ changeGameMode }) => {

  const handleGameMode = (event: React.ChangeEvent<HTMLSelectElement>) : void => {
    event.target.value === 'Standard' ? changeGameMode(GameMode.STANDARD) : changeGameMode(GameMode.HIGHSCORE)
    console.log(event.target.value)
  }
  
  return (
    <div className="control select is-multiple">
      <select name="gamemode" id="gamemode" onChange={handleGameMode}>
        <option value="Standard" key={uuidv1()}>Standard</option>
        <option value="Highscore" key={uuidv1()}>Scoreboard</option>
      </select>
      <br/>
    </div>
  )
}

export default GameModeButton
