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
import getGameModuleService from '../model/GameModuleFactory';


type GameProps = {
  gameModuleSerivce: IGameModuleService,
  players: Player[],
  gameService: GameService,
  activeGames: any[]
}

const Game: React.FC<GameProps> =({ gameModuleSerivce, players, gameService, activeGames }) => {
    
    const gameModules = [WheelComponent, Party, BackToBack, Trivia];
    const [currentGameIndex, setCurrentGameIndex] = useState(1);
    const [triviaEvents, setTriviaEvents] = useState<GameEventAPI | undefined>(undefined)
    const [backToBackEvents, setBackToBackEvents] = useState<GameEventAPI | undefined>(undefined)
    const [partyEvents, setPartyEvents] = useState<GameEventAPI | undefined>(undefined)
    const [winners, setWinners] = useState<Player[] | null>([]);
    const [flash, setFlash] = useState<string | undefined>();
    const [currentQuestion, setCurrentQuestion] = useState<object | number>(-1)


    // Load data to game events
    useEffect(() => {
        setTriviaEvents(gameModuleSerivce.getTriviaEvents())
        setBackToBackEvents(gameModuleSerivce.getBackToBackEvents())
        setPartyEvents(gameModuleSerivce.getPartyEvents())

        console.log(triviaEvents)
        console.log(partyEvents)
        console.log(backToBackEvents)

    }, [gameModuleSerivce, triviaEvents, partyEvents, backToBackEvents])

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
        const newGameIndex: number = gameService.getNewGameIndex(currentGameIndex, gameModules, activeGames)
        setCurrentGameIndex(newGameIndex);
        setEventCurrentQuestion(newGameIndex)
    }

    /**
     * Function that get question from current game-module and save it in state.
     */
     const setEventCurrentQuestion = (currentGameIndex: number) => {
      let currentGame: any;
      switch (currentGameIndex) {
        case 3:
          if(!triviaEvents) return
          currentGame = gameService.getRandomGameEvent(triviaEvents);
          break;
        case 2:
          if(!backToBackEvents) return
          currentGame = gameService.getRandomGameEvent(backToBackEvents);
          break;
        case 1:
          if(!partyEvents) return
          currentGame = gameService.getRandomGameEvent(partyEvents)
          break;
      }
      setCurrentQuestion(currentGame)
    }

    const removeGameEvent = (gameEventId: string, gameEvents: GameEventAPI): void => {
        gameEvents.questions.filter((question: ITrivia | IParty | IBackToBack) => {
            return question._id !== gameEventId        
        })
    }

    const gameServiceProps = {
        players: players,
        getPlayers: gameService.getPlayers, 
        addScore: gameService.addScore, 
        makeWinnerAlert: makeWinnerAlert, 
        chooseRandomNewGame: chooseRandomNewGame,
        removeGameEvent: removeGameEvent
    };

    if (!triviaEvents || !backToBackEvents || !partyEvents) {
        return (<div><p>Loading...</p></div>)
    }

    // If to many paused players
    if (gameService.getNumActivePlayers(players) < 2) {
      return <h1>Too many players are paused. Please wait for them and start their session again!</h1>
    }

    let currentGame;
    switch (currentGameIndex) {
      case 3: 
        currentGame = <Trivia gameService={gameServiceProps} gameEvent={currentQuestion}/>;
        break;
      case 2:
        currentGame = <BackToBack gameService={gameServiceProps} gameEvent={currentQuestion}/>;
        break;
      case 1:
        currentGame = <Party gameService={gameServiceProps} gameEvent={currentQuestion}/>;
        break;
      case 0:
        currentGame = <WheelComponent gameService={gameServiceProps} />;
        break;
    }

    if (!triviaEvents || !backToBackEvents || !partyEvents) {
      return (<div><p>Loading...</p></div>)
    } else if(currentQuestion < 0) {
      chooseRandomNewGame()
      return (<h1>Hej</h1>)
    }

    return (
      <div className="Game">
          <WinnerAlert winners={winners} message={flash} />
          <Scoreboard players={players} />
          {currentGame}
          <SkipGame makeWinnerAlert={makeWinnerAlert} chooseRandomNewGame={chooseRandomNewGame} />
      </div>
    );
}

export default Game;