/**
 * A component that renders the current scoreboard.
 * 
 * @author Susanna Persson
 */

import Player from './Player'

function Scoreboard(props: any) {

    if (props.getPlayers == null) {
        return (
            <div className="box">{props.message || "No scores"}</div>
        )
    } else if (props.getPlayers) {
        return (
            <div className="box">
                <div>{"Scores"}</div>
                 
          )
            </div>
        );
    } else {
    
    return (
        <span style={{display: "none"}}></span>
      );
  }
  
}

export default Scoreboard;
