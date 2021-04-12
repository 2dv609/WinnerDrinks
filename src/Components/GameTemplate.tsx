import { useState, useEffect } from 'react';
import GameProps from './GameProps';
import './../App.css';

const NUM_OF_PLAYERS = 2; // How many players do you need? 

function MyGame(props: any) {
    const gp: GameProps = props.gp; // Contains the methods done and getPlayers. 
    const [players, setPlayers] = useState(gp.getPlayers(NUM_OF_PLAYERS)); // players is an array 

    useEffect(() => { 
        return () => { // Return a function for code cleanup. This will set new players 

            setPlayers(gp.getPlayers(NUM_OF_PLAYERS));
        }
    }, [gp])

    // Do some logic here. Use the array players[someNumber] and when you're done,
    // call the function gp.done() and send in the winning player and some score. 

    return (
        <div>
            <h3>Selected players</h3>
            <ul>
                {/* Just make a list of the players */}
            {players.map(pl => (<li>{pl.toString()}</li>))} 
            </ul>
            {/* This buttons makes the player first in the list win, and adds 0 to their score. */}
            <button onClick={() => 
                doneReplacementFunction()
                } >Click here to win.</button>
        </div>
    )

    function doneReplacementFunction() {
        gp.addScore(players[0], 0)
        gp.makeWinnerAlert(players[0])
        gp.chooseRandomNewGame()
    }
};

export default MyGame;