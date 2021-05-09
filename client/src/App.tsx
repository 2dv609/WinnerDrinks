import React, { useState, useEffect } from 'react';
import Login from './Login';
import Game from './Game'
import Player from './model/Player'
import 'bulma';
import './App.css';
import ResetButton from './ResetButton';
import getGameModuleService from './model/GameModuleFactory'
import IGameModuleService from './model/IGameModuleService'
import GameService from './model/GameService'


function App(props: any) {
  // const [utilService, setUtilService] = useState<IUtilService | undefined>(undefined)
  const [gameModuleSerivce, setGameModuleSerivce] = useState<IGameModuleService | undefined>(undefined)
  const [names, setNames] = useState<Player[]>([]);
  const [play, setPlay] = useState(false);
  const gameService = new GameService();

  const addUser = (newUserName: string) => {
    const newUser = new Player(newUserName);
    setNames([...names, newUser]);
  };

  useEffect(() => {
    getGameModuleService().then((gms: IGameModuleService) => {setGameModuleSerivce(gms)})
  }, [])

  if (!play) {
    return (
      <div className="App section">
        <Login setter={addUser} />
        <input className="button" type="button" value="Done" onClick={() => {
          if (names.length < 2) return; // must be at least two players. 
          setPlay(true); 
        }} />
        <h2 className="title is-5" >Players</h2>
        <ul className="columns">
          {names.map(item =>
            (<li className="column" key={item.toString()}>{item.toString()}</li>)
          )}
        </ul>
      </div>
    );
  } else if (!gameModuleSerivce) {
    return (
      <div className="App section">
        <h1 className="title is-3">Error utilservice not defined</h1>
      </div>
    )
  } else {
    return (
      <div className="App section">
        <h1 className="title is-3">Let's play!</h1>
        <Game gameService={gameService} players={names} gameModuleSerivce={gameModuleSerivce}/>
        <ResetButton></ResetButton>
      </div>

    )
  }

}

export default App;
