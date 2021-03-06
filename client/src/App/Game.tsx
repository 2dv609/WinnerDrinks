/**
 * Gameplay component.
 * Displays the current game module, flash messages, winning messages, etc.
 */
/* eslint-disable default-case */
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
import Pause from './Pause'
import SkipGame from './SkipGame';
import { GameMode } from '../model/GameMode'
import { IGameModuleSetting } from '../model/GameModule'

type GameProps = {
  gameModuleService: IGameModuleService | undefined,
  gameMode: number,
  players: Player[],
  gameService: GameService,
  activeGames: IGameModuleSetting[]
}

const Game: React.FC<GameProps> = ({ gameModuleService, gameMode, players, gameService, activeGames }) => {
  const gameModules = [WheelComponent, Party, BackToBack, Trivia];
  const [currentGameIndex, setCurrentGameIndex] = useState(1);
  const [triviaEvents, setTriviaEvents] = useState<GameEventAPI | undefined>(undefined)
  const [backToBackEvents, setBackToBackEvents] = useState<GameEventAPI | undefined>(undefined)
  const [partyEvents, setPartyEvents] = useState<GameEventAPI | undefined>(undefined)
  const [winners, setWinners] = useState<Player[] | null>([]);
  const [flash, setFlash] = useState<string | undefined>();
  const [currentQuestion, setCurrentQuestion] = useState<object | number>(-1)
  const [currentPlayers, setCurrentPlayers] = useState<any>(undefined)

  // Load data to game events
  useEffect(() => {
    if (!gameModuleService) return

    setTriviaEvents(gameModuleService.getTriviaEvents())
    setBackToBackEvents(gameModuleService.getBackToBackEvents())
    setPartyEvents(gameModuleService.getPartyEvents())
  }, [gameModuleService])

  /**
   * This function is sent to game modules as a prop.
   * If any winner is declared, they are passed as parameters to this function
   *
   * @param p The winner(s). Null means no points awarded.
   * @param message A custom flash message for the winner, for example "Wrong answer".
   * @author Delfi Sehidic
   * @author Susanna Persson
   */
  const makeWinnerAlert = (p: Player | Player[] | null, message?: string): void => {
    if (Array.isArray(p)) { // If there are several winners
      setWinners(p); // This is the new array
    } else if (p === null) { // null == no points awarded, lost game
      setWinners(null);
    } else if (p instanceof Player) { // Just one player?
      setWinners([p]); // Send an array with only that player.
    } else {
      throw new Error('You need to pass an array of Players, a Player or null.');
    }
    if (message) {
      setFlash(message);
    } else {
      setFlash(undefined)
    }
  }
  /**
   * Selects a new game at random if it is activated.
   */
  const chooseRandomNewGame = (): void => {
    const newGameIndex: number = gameService.getNewGameIndex(currentGameIndex, gameModules, activeGames)
    setEventCurrentQuestion(newGameIndex)
    setCurrentPlayersInGame(newGameIndex)
    setCurrentGameIndex(newGameIndex);
  }

  const setCurrentPlayersInGame = (currentGameIndex: number) => {
    let currentPlayersInGame: any;
    switch (currentGameIndex) {
      case 3:
        if (!triviaEvents) return
        currentPlayersInGame = gameServiceProps.getPlayers(1, gameServiceProps.players)
        break;
      case 2:
        if (!backToBackEvents) return
        currentPlayersInGame = gameServiceProps.getPlayers(2, gameServiceProps.players)
        break;
      case 1:
        if (!partyEvents) return
        currentPlayersInGame = gameServiceProps.getPlayers(2, gameServiceProps.players)
        break;
      case 0:
        currentPlayersInGame = generateMorePlayers(gameServiceProps.getPlayers(4, gameServiceProps.players))
        break;
    }
    setCurrentPlayers(currentPlayersInGame)
  }

  /**
   * Function that get question from current game-module and save it in state.
   *
   */
  const setEventCurrentQuestion = (currentGameIndex: number) => {
    let currentGame: any;
    switch (currentGameIndex) {
      case 3:
        if (!triviaEvents) return
        currentGame = gameService.getRandomGameEvent(triviaEvents);
        setCurrentPlayers(gameServiceProps.getPlayers(1, gameServiceProps.players))
        break;
      case 2:
        if (!backToBackEvents) return
        currentGame = gameService.getRandomGameEvent(backToBackEvents);
        setCurrentPlayers(gameServiceProps.getPlayers(2, gameServiceProps.players))
        break;
      case 1:
        if (!partyEvents) return
        currentGame = gameService.getRandomGameEvent(partyEvents)
        setCurrentPlayers(gameServiceProps.getPlayers(2, gameServiceProps.players))
        break;
    }
    setCurrentQuestion(currentGame)
  }
  /**
   * TODO: Explain method
   * @author Anonymous
   * @param gameEventId
   * @param gameEvents
   */
  const removeGameEvent = (gameEventId: string, gameEvents: GameEventAPI): void => {
    gameEvents.questions.filter((question: ITrivia | IParty | IBackToBack) => {
      return question._id !== gameEventId
    })
  }

  /**
   * Function that generate random integer in span (min and max included).
   * @param {Number} min Min number
   * @param {Number} max Max number
   * @returns {Number} Random number generated
   */
  const randomIntFromInterval = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);

  const generateMorePlayers = (list: Player[]) => {
    if(list.length === 2) {
      const newListConst = list.concat(list)
      list = newListConst
    } else if(list.length === 3) {
      const index = randomIntFromInterval(0, 2)
      const newListConst = [...list]
      newListConst.push(list[index])
      list = newListConst
    }

    return list
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
    return (<div className="button is-loading" />)
  }

  // If to many paused players
  if (gameService.getNumActivePlayers(players) < 2) {
    return <Pause />
  }

  let currentGame;
  switch (currentGameIndex) {
    case 3:
      currentGame = <Trivia currentPlayers={currentPlayers} gameService={gameServiceProps} gameEvent={currentQuestion} />;
      break;
    case 2:
      currentGame = <BackToBack currentPlayers={currentPlayers} gameService={gameServiceProps} gameEvent={currentQuestion} />;
      break;
    case 1:
      currentGame = <Party currentPlayers={currentPlayers} gameService={gameServiceProps} gameEvent={currentQuestion} />;
      break;
    case 0:
      currentGame = <WheelComponent currentPlayers={currentPlayers} gameService={gameServiceProps} />;
      break;
  }

  if (!triviaEvents || !backToBackEvents || !partyEvents) {
    return (<h1><progress className="progress is-large is-info" max="100">Loading</progress></h1>)
  } else if (currentQuestion < 0) {
    chooseRandomNewGame()
    return (<h1><progress className="progress is-large is-info" max="100">Loading</progress></h1>)
  }

  let mode;
  if (gameMode === GameMode.STANDARD) {
    mode = <WinnerAlert winners={winners} message={flash} />;
  } else {
    mode = <Scoreboard players={players} message={flash} />
  }

  return (
    <div className="Game">
      {mode}
      {/* <WinnerAlert winners={winners} message={flash} /> */}
      {currentGame}
      <SkipGame makeWinnerAlert={makeWinnerAlert} chooseRandomNewGame={chooseRandomNewGame} />
      {/* <Scoreboard players={players} /> */}
    </div>
  );
}

export default Game;
