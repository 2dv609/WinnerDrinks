import React, { useState } from 'react';
import GameProps from '../GameProps';
import '../../App.css';

function Party(props: any) {
    const gp: GameProps = props.gp;
    const [task, setTask] = useState('');
    const players = gp.getPlayers(2);
    const player1 = players[0];
    const player2 = players[1];

    const setTasks = () => {
        const rand = Math.floor(Math.random() * tasks.length)
        setTask(tasks[rand])
    }
    const tasks: string[] = [
        `${player1} och ${player2} spelar sten-sax-påse, vinnaren tar en shot`,
        `${player1} och ${player2} dricker 10000 shots`,
        `${player1} kittlar ${player2} annars sprängs solen`,
        `${player1} och ${player2} pratar känslor`,
        `${player1} och ${player2} inser livets mening eller tar en shot`,

    ];

    return (
        <div>
            <div className="task">{task}</div>
            <button onClick={() => setTasks()} >Click here to get a task</button>
            <h3>Who won?</h3>

            <button onClick={() => {
                gp.done(player1, 1)
            }}>{player1.toString()}</button>

            <button onClick={() => {
                gp.done(player2, 1)
            }}>{player2.toString()}</button>

        </div>
    )
};

export default Party;