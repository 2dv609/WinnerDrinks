/**
 * Skip the current game and go to the next. 
 * 
 * @author Delfi Sehidic
 */

import React from 'react';
import Player from '../model/Player'


type SkipGameProps = {
    makeWinnerAlert: (p: Player | Player[] | null, message?: string) => void, 
    chooseRandomNewGame: () => void
}
 
const SkipGame: React.FC<SkipGameProps> = ({ makeWinnerAlert, chooseRandomNewGame }) => {
    return (
        <div className="block">
            <button className="button is-danger" data-testid="skip-button" 
            onClick={() => {
            makeWinnerAlert(null, "Skipped.");
            chooseRandomNewGame();
        }} >Skip</button>
        </div>

    )
}
 
export default SkipGame;
 