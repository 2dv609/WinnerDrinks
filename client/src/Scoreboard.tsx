/**
 * A component that renders the current scoreboard.
 * 
 * @author Susanna Persson
 */

import Player from './model/Player'

function Scoreboard(props: any) {

    if (props == null) {
        return (
            <div className="box">{"No scores yet!"}</div>
        )
    } else if (props) {
        return (
            <div className="box">
                <div className="">Current score:</div>
                    <table className="table is-fullwidth is-striped scoreboard">
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
