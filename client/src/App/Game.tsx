import React, { useState, useEffect } from 'react';
import Party from '../Components/Party/Party'
import WheelComponent from '../Components/WheelComponent/WheelComponent'
import BackToBack from '../Components/BackToBack/BackToBack';
import Trivia from '../Components/Trivia/Trivia'
import Player from '../model/Player'
import IGameModuleService from '../model/IGameModuleService'
import GameService from '../model/GameService'
import WinnerAlert from './WinnerAlert'
import Scoreboard from './Scoreboard';
import SkipGame from './SkipGame';

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
    const [winners, setWinners] = useState<Player[] | null>([]);
    const [flash, setFlash] = useState<string | undefined>();
    
    // Load data to game events
    useEffect(() => {
        
        setTriviaEvents(gameModuleSerivce.getTriviaEvents())
        setBackToBackEvents(gameModuleSerivce.getBackToBackEvents())
        setPartyEvents(gameModuleSerivce.getPartyEvents())
    }, [gameModuleSerivce])

    /**
     * This function is sent to game modules as a prop. 
     * If any winner is declared, they are passed as parameters to this function
     * 
     * @param p The winner(s). Null means no points awarded. 
     */
     const makeWinnerAlert = (p: Player | Player[] | null, message?: string): void => {
        if (Array.isArray(p)) { // If there are several winners
            setWinners(p); // This is the new array
        } else if (p === null) { // null == no points awarded, lost game
            setWinners(null);
         } else if (p instanceof Player) { // Just one player?
            setWinners([p]); // Send an array with only that player. 
        } else {
            throw new Error("You need to pass an array of Players, a Player or null.");
        }
        if (message) {
            setFlash(message);
        } else {
            setFlash(undefined)
        }
    }

    const chooseRandomNewGame = (): void => {
        setCurrentGameIndex(gameService.chooseRandomNewGame(currentGameIndex, gameModules));
    }

    const getRandomGameEvent = gameService.getRandomGameEvent

    const gameModuleProps = {
        players: players,
        getPlayers: gameService.getPlayers, 
        addScore: gameService.addScore, 
        makeWinnerAlert: makeWinnerAlert, 
        chooseRandomNewGame: chooseRandomNewGame
    };

    if (!triviaEvents || !backToBackEvents || !partyEvents) {
        return (<div><p>Loading...</p></div>)
    }

    switch (currentGameIndex) {
        case 3: 
            return (
            <div className="Game">
                <WinnerAlert winners={winners} message={flash} />
                <Scoreboard players={players} />
                <Trivia gameService={gameModuleProps} gameEvent={getRandomGameEvent(triviaEvents)} />
                <SkipGame makeWinnerAlert={makeWinnerAlert} chooseRandomNewGame={chooseRandomNewGame} />
            </div>);
        case 2:
            return (
            <div className="Game">
                <WinnerAlert winners={winners} message={flash} />
                <Scoreboard players={players} />
                <BackToBack gameService={gameModuleProps} gameEvent={getRandomGameEvent(backToBackEvents)} />
                <SkipGame makeWinnerAlert={makeWinnerAlert} chooseRandomNewGame={chooseRandomNewGame} />
            </div>);
        case 1:
            return (
            <div className="Game">
                <WinnerAlert winners={winners} message={flash} />
                <Scoreboard players={players} />
                <Party gameService={gameModuleProps} gameEvent={getRandomGameEvent(partyEvents)}/>
                <SkipGame makeWinnerAlert={makeWinnerAlert} chooseRandomNewGame={chooseRandomNewGame} />
            </div>);
        case 0:
            return (
            <div className="Game">
                <WinnerAlert winners={winners} message={flash} />
                <Scoreboard players={players} />
                <WheelComponent gameService={gameModuleProps} />
                <SkipGame makeWinnerAlert={makeWinnerAlert} chooseRandomNewGame={chooseRandomNewGame} />
            </div>);

    }
    return (
        <div className="Game">

        </div>
    );
}

export default Game;