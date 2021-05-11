/**
 * A component that renders the current scoreboard.
 * 
 * @author Susanna Persson
 */

import Player from '../model/Player'

type ScoreBoardProps = {
    players: Player[]
}  
  
const Scoreboard: React.FC<ScoreBoardProps> = ({ players }) => {

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
                            {players.map((item: Player, index: number) => (
                                <tr key={index}>
                                    <th>{item.toString()}:</th><td>{item.score}</td>
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
