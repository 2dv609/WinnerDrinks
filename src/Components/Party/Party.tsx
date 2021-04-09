import React, { useState, useEffect } from 'react';
import GameProps from '../GameProps';
import '../../App.css';

function Party(props: any) {
    const gp: GameProps = props.gp;
    const [players, setPlayers] = useState(gp.getPlayers(2));
    


    const tasks: string[] = [
        `${players[0]} och ${players[1]} spelar sten-sax-påse, vinnaren tar en shot`,
        `${players[0]} och ${players[1]} dricker 10000 shots`,
        `${players[0]} kittlar ${players[1]} annars sprängs solen`,
        `${players[0]} och ${players[1]} pratar känslor`,
        `${players[0]} och ${players[1]} inser livets mening eller tar en shot`,

    ];

    const [task, setTask] = useState(getNewTask());

    function getNewTask(): string {
        const rand = Math.floor(Math.random() * tasks.length)
        return tasks[rand];
    }

    useEffect(() => { 
        return () => { // Return a function for code cleanup. This will set new players 
            setPlayers(gp.getPlayers(2));
        }
    }, [gp])

    return (
        <div>
            <div className="task">{task}</div>
            <button onClick={() => setTask(getNewTask())} >Click here to get a task</button>
            <h3>Who won?</h3>

            <button onClick={() => {
                gp.done(players[0], 1)
            }}>{players[0].toString()}</button>

            <button onClick={() => {
                gp.done(players[1], 1)
            }}>{players[1].toString()}</button>

        </div>
    )
};

export default Party;