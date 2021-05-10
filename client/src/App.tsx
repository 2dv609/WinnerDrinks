import React, { useState, useEffect } from 'react';
import Login from './Login';
import Game from './Game'
import Player from './model/Player'
import 'bulma';
import './App.css';
import ResetButton from './ResetButton';
import ErrorMsg from './ErrorMsg';
import Navbar from './Components/Menu/Navbar';
import Icon from './Components/Menu/Icon';
import IGameModuleService from './model/IGameModuleService'
import getGameModuleService from './model/GameModuleFactory'
import GameService from './model/GameService'
import { IGameModuleSetting } from './Components/Menu/Navbar'


function App(props: any) {
  const [names, setNames] = useState<Player[]>([]);
  const [play, setPlay] = useState(false);
  const [nameerror, setError] = useState(false);
  const [gameModuleSerivce, setGameModuleSerivce] = useState<IGameModuleService | undefined>(undefined)
  const gameService: GameService = new GameService();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [gameModuleSettings, setGameModuleSettings] = useState<IGameModuleSetting[]>([
    { name: 'Wheel', active: true, index: 0 },
    { name: 'Party', active: true, index: 1 }, 
    { name: 'BackToBack', active: true, index: 2 }, 
    { name: 'Trivia', active: true, index: 3 }, 
  ])

  useEffect(() => {
    getGameModuleService().then((gms: IGameModuleService) => {setGameModuleSerivce(gms)})
  }, [])

  /**
   * Function that deletes an added player by name.
   * @param userName Name of Player to be deleted from state.
   */
  const deleteUser = (userName: string) => {
    const copiedNames = [...names]
    const index = copiedNames.findIndex((user) => user.name === userName)
    if(index >= 0) {
      copiedNames.splice(index, 1)
      setNames(copiedNames);
    }
  }

  const gameModuleSettingUpdate = (temp: any[]): void => {
    setGameModuleSettings(temp)
  }

  /**
   * Function updating the state of the player. If (s)he is active or paused.
   */
  const updatePlayerActive = (playerName: string): void => {
    const namesCopy = [...names]
    namesCopy.forEach((player) => player.name === playerName ? player.isActive = !player.isActive : false)
    setNames(namesCopy)
  }

  const addUser = (newUserName: string): void => {
    try {
      const newUser = new Player(newUserName);
      setNames([...names, newUser]);
    } catch (error) {
      window.alert(error) //For now.
    }
  };

  if (!gameModuleSerivce) {
    return (
      <div>
        <p>Error</p>
      </div>
    )
  }

  if (!play) {
    if (!nameerror) {
      return (
        <div>

        {/* Navbar */}
        <Icon setNavbarOpen={setNavbarOpen} />
        <Navbar
          navbarOpen={navbarOpen}
          names={names}  
          gameModuleSettings={gameModuleSettings} 
          addUser={addUser} 
          deleteUser={deleteUser} 
          onGameModuleSettingUpdate={gameModuleSettingUpdate} 
          updatePlayerActive={updatePlayerActive} />

        <div className="App section" onClick={() => navbarOpen ? setNavbarOpen(false) : undefined}>

          <Login setter={addUser} />
            <input className="button" type="button" value="Done" onClick={() => {
            // must be at least two players. 
            if (names.length < 2) {
              setError(true);
            } else {
              setPlay(true); 
            }
            }} />
          <h2 className="title is-5" >Players</h2>
          <ul className="columns">
            {names.map(item =>
              (<li className="column" key={item.toString()}>{item.toString()}</li>)
            )}
          </ul>
        </div>
        </div>
      );
    } else {
      return (
        <div>

        {/* Navbar */}
        <Icon setNavbarOpen={setNavbarOpen} />
        <Navbar
          navbarOpen={navbarOpen}
          names={names}  
          gameModuleSettings={gameModuleSettings} 
          addUser={addUser} 
          deleteUser={deleteUser} 
          onGameModuleSettingUpdate={gameModuleSettingUpdate} 
          updatePlayerActive={updatePlayerActive} />
        
        <div className="App section" onClick={() => navbarOpen ? setNavbarOpen(false) : undefined}>
          <Login setter={addUser} />
            <input className="button" type="button" value="Done" onClick={() => {
            // must be at least two players. 
            if (names.length < 2) {
              setError(true);
            } else {
              setPlay(true); 
            }
            }} />
          <ErrorMsg message='There needs to be at least two players to start the game!'></ErrorMsg>
          <h2 className="title is-5" >Players</h2>
          <ul className="columns">
            {names.map(item =>
              (<li className="column" key={item.toString()}>{item.toString()}</li>)
            )}
          </ul>
        </div>
        </div>

      );
    }
  } else {
    return (
      <div>
      {/* Navbar */}
      <Icon setNavbarOpen={setNavbarOpen} />
      <Navbar
        navbarOpen={navbarOpen}
        names={names}  
        gameModuleSettings={gameModuleSettings} 
        addUser={addUser} 
        deleteUser={deleteUser} 
        onGameModuleSettingUpdate={gameModuleSettingUpdate} 
        updatePlayerActive={updatePlayerActive} />
    
      <div className="App section" onClick={() => navbarOpen ? setNavbarOpen(false) : undefined}>
        <h1 className="title is-3">Let's play!</h1>
        <Game gameService={gameService} players={names} gameModuleSerivce={gameModuleSerivce}/>
        <ResetButton />
      </div>
      </div>
    )
  };

}

export default App;
