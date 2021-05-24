import { TextGameModuleProps } from '../GameModuleProps';
import '../../App/App.css';

const BackToBack: React.FC<TextGameModuleProps> = ({ gameService, gameEvent, currentPlayers }) => {
    // Either both win, or both lose.

    return (
        <div className="box container">
            <div data-testid="current-players" >{currentPlayers[0].toString()} and {currentPlayers[1].toString()}, place yourself back to back or close your eyes! Then point at one of you to answer the question below!</div>
            <div className="content" data-testid="game-event" >{gameEvent.question}</div>
            <h3 className="title is-6">Are they pointing at the same person?</h3>
            <div className="columns">
                <div className="column">
                    <button className="button is-primary is-light" data-testid="button-correct" onClick={() => {
                        gameService.addScore(currentPlayers[0])
                        gameService.addScore(currentPlayers[1])
                        gameService.makeWinnerAlert(currentPlayers)
                        gameService.chooseRandomNewGame()
                    }}>Yes!</button>
                </div>
                <div className="column">
                    <button className="button is-danger is-light" data-testid="button-incorrect" onClick={() => {
                        gameService.makeWinnerAlert(null)
                        gameService.chooseRandomNewGame()
                    }}>No!</button>
                </div>
            </div>
        </div>
    )
};

export default BackToBack;