import React, { useState, useEffect } from 'react';
import './App.css';

function Game(props: any) {
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');
    const [task, setTask] = useState('');

    const setPlayers = () => {
        let rand1 = Math.floor(Math.random() * props.players.length);
        let rand2 = rand1;
        while (rand1 === rand2) {
            rand2 = Math.floor(Math.random() * props.players.length);
        }
        setPlayer1(props.players[rand1]);
        setPlayer2(props.players[rand2]);
    };

    const setTasks = () => {
        const rand = Math.floor(Math.random() * tasks.length)
        setTask(tasks[rand])
    }

    useEffect(() => {
        setPlayers();
        setTasks();
    }, []);

    const tasks: string[] = [
        `${player1} och ${player2} spelar sten-sax-påse, vinnaren tar en shot`,
        `${player1} och ${player2} dricker 10000 shots`,
        `${player1} kittlar ${player2} annars sprängs solen`,
        `${player1} och ${player2} pratar känslor`,
        `${player1} och ${player2} inser livets mening eller tar en shot`,

    ];

    return (
        <div className="Game">

            <div className="task">{task}</div>
            <button onClick={() => {
                setPlayers(); setTasks();
            }}>Nästa</button>
        </div>
    );
}

export default Game;