import React, { useState } from 'react';
import Party from './Components/Party/Party'
import Player from './Player'
import WheelComponent from './Components/WheelComponent/WheelComponent'
import './App.css';


function shuffle(array: Player[]) {
//TODO shuffle the array so the players are always random
}

function Game(props: any) {
    const games = [WheelComponent, Party];
    const [currentGameIndex, setCurrentGameIndex] = useState(1);

    const done = (affected: Player, score: number) => {
        affected.addScore(score);
        alert(`The winner is ${affected.toString()} with a total score of: ${affected.score}`);
        let newIndex = currentGameIndex;
        while (newIndex === currentGameIndex) { // Don't allow the same game twice in a row. 
            newIndex = Math.floor(Math.random() * games.length)
        }
        setCurrentGameIndex(newIndex);

    };

    const getPlayers = (amount: number) :Player[] =>  {
        const result: Player[] = [];
        amount = Math.min(amount, props.players.length)
        shuffle(props.players);
        for (let i = 0; i < amount; i++) {
            result.push(props.players[i])
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