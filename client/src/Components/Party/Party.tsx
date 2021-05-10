import React, { useState, useEffect } from 'react';
import GameProps from '../GameProps';

function Party(props: any) {
    const gp: GameProps = props.gp;
    const [players, setPlayers] = useState(gp.getPlayers(2));

    function addPlayerToGameEvent(): string {
      const gameEvent:string = props.gameEvent.question
      const formatEvent = gameEvent.replace('{players[0]}', `${players[0]}`).replace('{players[1]}', `${players[1]}`)
      return formatEvent
    }

    useEffect(() => { 
        return () => { // Return a function for code cleanup. This will set new players 
          setPlayers(gp.getPlayers(2));
        }
    }, [gp])

    return (
        <div className="box">
            <div className="content">{addPlayerToGameEvent()}</div>
            <h3>Who won?</h3>

            <button className="button" onClick={() => {
                gp.addScore(players[0], 1)
                gp.makeWinnerAlert(players[0])
                gp.chooseRandomNewGame()
            }}>{players[0].toString()}</button>

            <button className="button" onClick={() => {
                gp.addScore(players[1], 1)
                gp.makeWinnerAlert(players[1])
                gp.chooseRandomNewGame()
            }}>{players[1].toString()}</button>

        </div>
    )
};

export default Party;