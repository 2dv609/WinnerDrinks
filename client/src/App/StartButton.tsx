import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

/**
 * Component displaying a start button.
 */

type GameModeMenuProps = {
  changePlayStatus: () => void
}

const StartButton: React.FC<GameModeMenuProps> = ({ changePlayStatus }) => {

  const handlePlayStatus = (event: React.MouseEvent<SVGSVGElement>): void => {
    changePlayStatus()
  }
  
  return (
    <div className="control block">
        <FontAwesomeIcon
          id="doneBtn" 
          className="ml-3 is-clickable has-text-success" 
          data-testid="add-user-button" 
          icon={faPlay} 
          size="2x" 
          onClick={handlePlayStatus}/>
    </div>
  )
}

export default StartButton
