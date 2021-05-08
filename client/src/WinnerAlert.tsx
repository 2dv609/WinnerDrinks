/**
 * A component that renders the winners of a game, if any. 
 * 
 * @author Delfi Sehidic
 */

import React from 'react';
import Player from './Player'

function WinnerAlert(props: any) {
    if (props.winners == null) { // Null means that no one won anything.
        return (
            <div className="box">No points awarded.</div>
        )
    } else if (props.winners.length === 1) { // If there is only one winner....
        return (
            <div className="box">
                Good job, {props.winners[0].toString()}
            </div>
        );
    } else if (props.winners.length > 1) { // If there are several winners, display them all. 
        return (
            <div className="box">
                Points to: {props.winners.map((item: Player) =>
            (<span>{item.toString()}</span>)
          )}
            </div>
        );
    }
  else {
      // Initial state. No winner or loser, just an empty span. 
    return (
        <span style={{display: "none"}}></span>
      );
  }
  
}

export default WinnerAlert;
