import { useState, useEffect } from 'react';
import { TextGameModuleProps } from '../GameModueProps';
import '../../App.css';


const NUM_OF_PLAYERS = 2; // How many players do you need?

const BackToBack: React.FC<TextGameModuleProps> = ({ gameService, gameEvent }) => {
    // const gp: GameProps = props.gp; // Contains the methods done and getPlayers. 
    const [players, setPlayers] = useState(gameService.getPlayers(NUM_OF_PLAYERS, gameService.players)); // players is an array 

    useEffect(() => { 
        return () => { // Return a function for code cleanup. This will set new players 

            setPlayers(gameService.getPlayers(NUM_OF_PLAYERS, gameService.players));
        }
    }, [gameService, players])

    // Either both win, or both lose.
    return (
        <div className="box container">
            <div data-testid="game-event" className="content">{gameEvent.question}</div>
            <h3 className="title is-6">Were both correct?</h3>

            <button className="button" onClick={() => {
                gameService.addScore(players[0], 1)
                gameService.addScore(players[1], 1)
                gameService.makeWinnerAlert(players)
                gameService.chooseRandomNewGame()
            }}>They were correct!</button>
            <button className="button" onClick={() => {
                gameService.makeWinnerAlert(null)
                gameService.chooseRandomNewGame()
            }}>They were wrong!</button>
        </div>
    )
};

export default BackToBack;