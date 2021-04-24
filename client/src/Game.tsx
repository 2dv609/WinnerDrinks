import React, { useState } from 'react';
import Party from './Components/Party/Party'
import Player from './Player'
import WheelComponent from './Components/WheelComponent/WheelComponent'
import Trivia from './Components/Trivia/Trivia';
import MultiQuestion from './Components/MultiQuestion/MultiQuestion'


function shuffle(array: Player[]) {
    var m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

function Game(props: any) {
    const games = [WheelComponent, Party, Trivia, MultiQuestion];
    const [currentGameIndex, setCurrentGameIndex] = useState(1);
    

    const addScore = (p: Player, score: number) => {
        p.addScore(score)
    }

    const makeWinnerAlert = (p: any) => {
        let str: string

        // If p is an array, display an alert for multiple players
        if (Array.isArray(p)) {
            str = 'The winners are: \n'
            p.forEach(element => {
                str = str + `${element.toString()} with a total score of: ${element.score} \n`
            });

            // If there is no param, display an alert for no points given
        } else if (p == null) {
            str = `No points awarded!`

            //If p is a single player object, display an alert for one winner
        } else if (p instanceof Player) {
            str = `The winner is ${p.toString()} with a total score of: ${p.score}`
        } else {
            str = ``
        }

        alert(str);
    }

    const chooseRandomNewGame = () => {
        let newIndex = currentGameIndex;
        while (newIndex === currentGameIndex) { // Don't allow the same game twice in a row. 
            newIndex = Math.floor(Math.random() * games.length)
        }
        setCurrentGameIndex(newIndex);
    }

    const getPlayers = (amount: number): Player[] => {
        const result: Player[] = [];
        amount = Math.min(amount, props.players.length)
        shuffle(props.players);
        for (let i = 0; i < amount; i++) {
            result.push(props.players[i])
        }
        return result;
    };

    const gameProps = { 
        getPlayers: getPlayers, 
        addScore: addScore, 
        makeWinnerAlert: makeWinnerAlert, 
        chooseRandomNewGame: chooseRandomNewGame
    };
    switch (currentGameIndex) {
        case 3: 
            return (<div className="Game"><MultiQuestion gp={gameProps} /></div>);
        case 2:
            return (<div className="Game"><Trivia gp={gameProps}/></div>);
        case 1:
            return (<div className="Game"><Party gp={gameProps}/></div>);
        case 0:
            return (<div className="Game"><WheelComponent gp={gameProps} /></div>);

    }
    return (
        <div className="Game">

        </div>
    );
}

export default Game;