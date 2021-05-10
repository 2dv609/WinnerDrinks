/**
 * A component that renders the winners of a game, if any. 
 * 
 * @author Delfi Sehidic
 */

import React from 'react';
import Player from '../model/Player'

type WinnerAlertProps = {
    winners: Player[] | null,
    message: string | undefined
}

const WinnerAlert: React.FC<WinnerAlertProps> = ({ winners, message }) => {

    if (winners == null) { // Null means that no one won anything.
        return (
            <div className="box">{message || "No points awarded"}</div>
        )
    } else if (winners.length === 1) { // If there is only one winner....
        return (
            <div className="box">
                {message || "Have a sip, "} {winners[0].toString()}
            </div>
        );
    } else if (winners.length > 1) { // If there are several winners, display them all. 
        
        return (
            <div className="box">
                <div>{message || "A sip each to:  "}</div>
                 {winners.map((item: Player, index: number) =>
            (<span key={index} className="tag">{item.toString()}</span>)
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
