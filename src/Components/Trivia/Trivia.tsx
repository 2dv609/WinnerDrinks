import { useState, useEffect } from 'react';
import GameProps from '../GameProps';
import '../../App.css';

const NUM_OF_PLAYERS = 2; // How many players do you need? 

function Trivia(props: any) {
    const gp: GameProps = props.gp; // Contains the methods done and getPlayers. 
    const [players, setPlayers] = useState(gp.getPlayers(NUM_OF_PLAYERS)); // players is an array 

    useEffect(() => { 
        return () => { // Return a function for code cleanup. This will set new players 

            setPlayers(gp.getPlayers(NUM_OF_PLAYERS));
        }
    }, [gp])

    // Do some logic here. Use the array players[someNumber] and when you're done,
    // call the function gp.done() and send in the winning player and some score. 

    const tasks: string[] = [
        `Vem är bäst på att städa?`,
        `Vem är bäst på att laga mat?`,
        `Vem kommer att somna först?`,
        `Vem festar till solen går upp?`,
        `Vem har den bästa humorn?`,
    ];

    const [task, setTask] = useState(getNewTask());

    function getNewTask(): string {
        const rand = Math.floor(Math.random() * tasks.length)
        return tasks[rand];
    }

    // Either both win, or both lose. 
    return (
        <div>
            <div className="task">{task}</div>
            <h3>Were both correct?</h3>

            <button onClick={() => {
                gp.doneTwoWinners(players[0], players[1], 1)
            }}>{'They were correct!'}</button>
            <button onClick={() => {
                gp.doneNoWinners()
            }}>{'They were wrong!'}</button>
        </div>
    )
};

export default Trivia;