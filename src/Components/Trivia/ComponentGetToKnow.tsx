import React, { useState, useEffect } from 'react';
import './App.css';

function ComponentGetToKnow(props: any) {

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
        `${player1} och ${player2} diskuterar livets mening, en shot till den som övertygar den andre`,
        `${player1} och ${player2} diskuterar rymdvarelser, en shot till den som framför bästa argumentet`,
        `${player1} och ${player2} delar med sig av bästa drinkreceptet, vinnaren efter omröstning får dricka`,
        `${player1} och ${player2} pratar känslor, båda får dricka`,
        `${player1} och ${player2} berättar något som de tror den andre inte har gjort, den som lyckas får en shot`,

    ];
  
    return (
        <div className="ComponentGetToKnow">

            <div className="task">{task}</div>
            <button onClick={() => {
                setPlayers(); setTasks();
            }}>Nästa</button>
        </div>
    );
}

export default ComponentGetToKnow;


