import React, { useState, useEffect } from 'react';
import Party from './Components/Party/Party'
import WheelComponent from './Components/WheelComponent/WheelComponent'
import BackToBack from './Components/BackToBack/BackToBack';
import Trivia from './Components/Trivia/Trivia'
import Player from './model/Player'
import IGameModuleService from './model/IGameModuleService'
import GameService from './model/GameService'

type GameProps = {
  gameModuleSerivce: IGameModuleService,
  players: Player[],
  gameService: GameService
}

const Game: React.FC<GameProps> =({ players, gameModuleSerivce, gameService }) => {
    const gameModules = [WheelComponent, Party, BackToBack, Trivia];
    const [currentGameIndex, setCurrentGameIndex] = useState(1);
    const [triviaEvents, setTriviaEvents] = useState<GameEventAPI | undefined>(undefined)
    const [backToBackEvents, setBackToBackEvents] = useState<GameEventAPI | undefined>(undefined)
    const [partyEvents, setPartyEvents] = useState<GameEventAPI | undefined>(undefined)
    
    // Load data to game events
    useEffect(() => {
        
        setTriviaEvents(gameModuleSerivce.getTriviaEvents())
        setBackToBackEvents(gameModuleSerivce.getBackToBackEvents())
        setPartyEvents(gameModuleSerivce.getPartyEvents())
        
        console.log('response[0]', gameModuleSerivce.getTriviaEvents())
        console.log('response[1]', gameModuleSerivce.getBackToBackEvents())
        console.log('response[2]', gameModuleSerivce.getPartyEvents())
    }, [gameModuleSerivce])

    const chooseRandomNewGame = () => {
        setCurrentGameIndex(gameService.chooseRandomNewGame(currentGameIndex, gameModules));
    }

    const getRandomGameEvent = gameService.getRandomGameEvent

    const gameModuleProps = {
        players: players,
        getPlayers: gameService.getPlayers, 
        addScore: gameService.addScore, 
        makeWinnerAlert: gameService.makeWinnerAlert, 
        chooseRandomNewGame: chooseRandomNewGame
    };

    if (!triviaEvents || !backToBackEvents || !partyEvents) {
        return (<div><p>Loading...</p></div>)
    }

    switch (currentGameIndex) {
        case 3: 
            return (<div className="Game"><Trivia gameService={gameModuleProps} gameEvent={getRandomGameEvent(triviaEvents)}/></div>);
        case 2:
            return (<div className="Game"><BackToBack gameService={gameModuleProps} gameEvent={getRandomGameEvent(backToBackEvents)}/></div>);
        case 1:
            return (<div className="Game"><Party gameService={gameModuleProps} gameEvent={getRandomGameEvent(partyEvents)}/></div>);
        case 0:
            return (<div className="Game"><WheelComponent gameService={gameModuleProps} /></div>);

    }
    return (
        <div className="Game">

        </div>
    );
}

export default Game;