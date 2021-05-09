/**
 * A component that renders the current scoreboard.
 * 
 * @author Susanna Persson
 */

import Player from './Player'

function Scoreboard(props: any) {

    if (props == null) {
        return (
            <div className="box">{"No scores yet!"}</div>
        )
    } else if (props) {
        return (
            <div className="box scoreboard">
                <div>{"Scores so far:"}</div>
                <table className="table is-fullwidth">
                    <tbody>
                    {props.players.map((item: Player) => (
                        <tr>
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
