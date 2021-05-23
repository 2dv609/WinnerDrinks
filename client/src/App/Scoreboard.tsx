/**
 * A component that renders the current scoreboard.
 * 
 * @author Susanna Persson
 */

import Player from '../model/Player'

type ScoreBoardProps = {
    players: Player[],
    message: string | undefined
}  
  
const Scoreboard: React.FC<ScoreBoardProps> = ({ players, message }) => {

    if (players == null) {
        return (
            <div className="box">{"No scores yet!"}</div>
        )
    } else if (players) {
        return (
            <div className="box">
                <div className="">Current score:</div>
                    <table className="table is-fullwidth is-striped scoreboard">
                        <tbody>
                            {players.map((player: Player, index: number) => (
                                <tr key={index} data-testid={`scoreboard-row-${index}`}>
                                    <th>{player.toString()}:</th><td>{player.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table> 
            </div>
        );
    } else {
        return (
            <span style={{display: "none"}}></span>
        );
    }
}

export default Scoreboard;
