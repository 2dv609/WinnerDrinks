/**
 * Skip the current game and go to the next. 
 * 
 * @author Delfi Sehidic
 */

 import React from 'react';

 
 function SkipGame(props: any) {
    return (
        <button className="button is-danger" onClick={() => {
            props.gp.makeWinnerAlert(null, "Skipped.");
            props.gp.chooseRandomNewGame();
        }} >Skip</button>
    )
 }
 
 export default SkipGame;
 