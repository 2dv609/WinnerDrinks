import React, { useState, useEffect } from 'react';
import Party from './Components/Party/Party'
import Player from './Player'
import WheelComponent from './Components/WheelComponent/WheelComponent'
import BackToBack from './Components/BackToBack/BackToBack';
import Trivia from './Components/Trivia/Trivia'
import { UtilService } from './util/UtilService'


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
    const games = [WheelComponent, Party, BackToBack, Trivia];
    const [currentGameIndex, setCurrentGameIndex] = useState(1);
    const [triviaEvents, setTriviaEvents] = useState<GameEventAPI | undefined>(undefined)
    const [backToBackEvents, setBackToBackEvents] = useState<GameEventAPI | undefined>(undefined)
    const [partyEvents, setPartyEvents] = useState<GameEventAPI | undefined>(undefined)
    
    // Load data to game events
    useEffect(() => {
        const utilService: UtilService = new UtilService()
        let triviaEvents: Promise<GameEventAPI | undefined> = utilService.getTrivia()
        let backToBackEvents: Promise<GameEventAPI | undefined> = utilService.getBackToBack()
        let partyEvents: Promise<GameEventAPI | undefined> = utilService.getParty()

        // maybe promise allSettled is better to use then if one promise is rejected you can use some cached events
        Promise.all([triviaEvents, backToBackEvents, partyEvents]).then((response) => {
            setTriviaEvents(response[0])
            setBackToBackEvents(response[1])
            setPartyEvents(response[2])

            console.log('response[0]', response[0])
            console.log('response[1]', response[1])
            console.log('response[2]', response[2])
        })
      }, [])

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

    const getRandomGameEvent = (gameEventAPI: GameEventAPI): IBackToBack | IParty | ITrivia => {
        return gameEventAPI.questions[Math.floor(Math.random() * gameEventAPI.questions.length)]
    }

    const gameProps = { 
        getPlayers: getPlayers, 
        addScore: addScore, 
        makeWinnerAlert: makeWinnerAlert, 
        chooseRandomNewGame: chooseRandomNewGame
    };

    if (!triviaEvents || !backToBackEvents || !partyEvents) {
        return (<div><p>Loading...</p></div>)
    }

    switch (currentGameIndex) {
        case 3: 
            return (<div className="Game"><Trivia gp={gameProps} gameEvent={getRandomGameEvent(triviaEvents)}/></div>);
        case 2:
            return (<div className="Game"><BackToBack gp={gameProps} gameEvent={getRandomGameEvent(backToBackEvents)}/></div>);
        case 1:
            return (<div className="Game"><Party gp={gameProps} gameEvent={getRandomGameEvent(partyEvents)}/></div>);
        case 0:
            return (<div className="Game"><WheelComponent gp={gameProps} /></div>);

    }
    return (
        <div className="Game">

        </div>
    );
}

export default Game;