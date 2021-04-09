import React, { useState } from 'react';
import Party from './Components/Party/Party'
import Player from './Player'
import WheelComponent from './Components/WheelComponent/WheelComponent'
import './App.css';

function Game(props: any) {
    const players: Player[] = props.players;
    const games = [WheelComponent, Party];
    const [currentGameIndex, setCurrentGameIndex] = useState(0);

    const done = (affected: Player, score: number) => {
        affected.addScore(score);
        alert(`The winner is ${affected.toString()} with a total score of: ${affected.score}`);
        setCurrentGameIndex(Math.floor(Math.random() * games.length));

    };

    const getPlayers = (amount: number) :Player[] =>  {
        const result: Player[] = [];
        for (let i = 0; i < amount; i++) {
            let rand;
            do {
                rand = Math.floor(Math.random() * props.players.length);
            } while (props.players[rand] !in result )
            result.push(props.players[rand])
        }
        return result;
    };


    const gameProps = { getPlayers: getPlayers, done: done };
    switch (currentGameIndex) {
        case 1: 
            return (<div className="Game"><Party gp={gameProps} /></div>);
        case 0:
            return (<div className="Game"><WheelComponent gp={gameProps} /></div>);
        
    }
    return (
        <div className="Game">
            
        </div>
    );
}

export default Game;