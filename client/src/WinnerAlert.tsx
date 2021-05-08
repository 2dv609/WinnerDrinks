import React from 'react';
import Player from './Player'

function WinnerAlert(props: any) {
    if (props.winners == null) {
        return (
            <div className="box">No points awarded.</div>
        )
    } else if (props.winners.length === 1) {
        return (
            <div className="box">
                Good job, {props.winners[0].toString()}
            </div>
        );
    } else if (props.winners.length > 1) {
        return (
            <div className="box">
                Points to: {props.winners.map((item: Player) =>
            (<span>{item.toString()}</span>)
          )}
            </div>
        );
    }
  else {
    return (
        <span>No</span>
      );
  }
  
}

export default WinnerAlert;
