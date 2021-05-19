import { TextGameModuleProps } from '../GameModuleProps';
import '../../App/App.css';

const BackToBack: React.FC<TextGameModuleProps> = ({ gameService, gameEvent, currentPlayers }) => {
    // Either both win, or both lose.

    return (
        <div className="box container">
            <div>{currentPlayers[0].toString()} and {currentPlayers[1].toString()}</div>
            <div data-testid="game-event" className="content">{gameEvent.question}</div>
            <h3 className="title is-6">Were both correct?</h3>
            <div className="columns">
                <div className="column">
                    <button className="button is-primary is-light" onClick={() => {
                        gameService.addScore(currentPlayers[0], 1)
                        gameService.addScore(currentPlayers[1], 1)
                        gameService.makeWinnerAlert(currentPlayers)
                        gameService.chooseRandomNewGame()
                    }}>They were correct!</button>
                </div>
                <div className="column">
                    <button className="button is-danger is-light" onClick={() => {
                        gameService.makeWinnerAlert(null)
                        gameService.chooseRandomNewGame()
                    }}>They were wrong!</button>
                </div>
            </div>


        </div>
    )
};

export default BackToBack;