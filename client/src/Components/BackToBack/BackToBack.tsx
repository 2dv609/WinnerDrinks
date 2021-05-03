import { useState, useEffect } from 'react';
import GameProps from '../GameProps';
import '../../App.css';

const NUM_OF_PLAYERS = 2; // How many players do you need? 

function BackToBack(props: any) {
    const gp: GameProps = props.gp; // Contains the methods done and getPlayers. 
    const [players, setPlayers] = useState(gp.getPlayers(NUM_OF_PLAYERS)); // players is an array 

    useEffect(() => { 
        return () => { // Return a function for code cleanup. This will set new players 

            setPlayers(gp.getPlayers(NUM_OF_PLAYERS));
        }
    }, [gp])

    // Either both win, or both lose.
    return (
        <div className="box container">
            <div className="content">{props.gameEvent.question}</div>
            <h3 className="title is-6">Were both correct?</h3>

            <button className="button" onClick={() => {
                gp.addScore(players[0], 1)
                gp.addScore(players[1], 1)
                gp.makeWinnerAlert(players)
                gp.chooseRandomNewGame()
            }}>{'They were correct!'}</button>
            <button className="button" onClick={() => {
                gp.makeWinnerAlert(null)
                gp.chooseRandomNewGame()
            }}>{'They were wrong!'}</button>
        </div>
    )
};

export default BackToBack;