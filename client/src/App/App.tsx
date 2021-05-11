import React, { useState, useEffect } from 'react'
import Login from './Login'
import Game from './Game'
import Player from '../model/Player'
import 'bulma'
import './App.css'
import ResetButton from './ResetButton'
import ErrorMsg from './ErrorMsg'
import Navbar from '../Components/Menu/Navbar'
import Icon from '../Components/Menu/Icon'
import IGameModuleService from '../model/IGameModuleService'
import getGameModuleService from '../model/GameModuleFactory'
import GameService from '../model/GameService'
import { IGameModuleSetting } from '../Components/Menu/Navbar'


function App() {
  const gameService: GameService = new GameService();
  const [players, setPlayers] = useState<Player[]>([]);
  const [play, setPlay] = useState(false);
  const [nameerror, setError] = useState(false);
  const [gameModuleSerivce, setGameModuleSerivce] = useState<IGameModuleService | undefined>(undefined)
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
   * @param palyerName Name of Player to be deleted from state.
   */
  const deleteUser = (playerName: string): void => {
    const updatedPlayers: Player[] = [...players]
    const index = updatedPlayers.findIndex((player: Player) => player.name === playerName)
    if (index >= 0) {
      updatedPlayers.splice(index, 1)
      setPlayers(updatedPlayers);
    }
  }

  const gameModuleSettingUpdate = (gameModuleSettings: IGameModuleSetting[]): void => {
    setGameModuleSettings(gameModuleSettings)
  }

  /**
   * Function updating the state of the player. If (s)he is active or paused.
   */
  const updatePlayerActive = (playerName: string): void => {
    const updatedPlayers: Player[] = [...players]
    updatedPlayers.forEach((player) => player.name === playerName ? player.isActive = !player.isActive : false)
    setPlayers(updatedPlayers)
  }

  const addUser = (newPlayerName: string): void => {
    try {
      const newPlayer = new Player(newPlayerName);
      setPlayers([...players, newPlayer]);
    } catch (error) {
      window.alert(error) //For now.
    }
  };

  if (!gameModuleSerivce) {
    return (
      <div></div>
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
          players={players}  
          gameModuleSettings={gameModuleSettings} 
          addUser={addUser} 
          deleteUser={deleteUser} 
          onGameModuleSettingUpdate={gameModuleSettingUpdate} 
          updatePlayerActive={updatePlayerActive} />

        <div className="App section" onClick={() => navbarOpen ? setNavbarOpen(false) : undefined}>

          <Login addUser={addUser} />
            <input className="button" type="button" value="Done" onClick={() => {
            // must be at least two players. 
            if (players.length < 2) {
              setError(true);
            } else {
              setPlay(true); 
            }
            }} />
          <h2 className="title is-5" >Players</h2>
          <ul className="columns">
            {players.map(player =>
              (<li className="column" key={player.toString()}>{player.toString()}</li>)
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
          players={players}  
          gameModuleSettings={gameModuleSettings} 
          addUser={addUser} 
          deleteUser={deleteUser} 
          onGameModuleSettingUpdate={gameModuleSettingUpdate} 
          updatePlayerActive={updatePlayerActive} />
        
        <div className="App section" onClick={() => navbarOpen ? setNavbarOpen(false) : undefined}>
          <Login addUser={addUser} />
            <input className="button" type="button" value="Done" onClick={() => {
            // must be at least two players. 
            if (players.length < 2) {
              setError(true);
            } else {
              setPlay(true); 
            }
            }} />
          <ErrorMsg message='There needs to be at least two players to start the game!'></ErrorMsg>
          <h2 className="title is-5" >Players</h2>
          <ul className="columns">
            {players.map(player =>
              (<li className="column" key={player.toString()}>{player.toString()}</li>)
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
        players={players}  
        gameModuleSettings={gameModuleSettings} 
        addUser={addUser} 
        deleteUser={deleteUser} 
        onGameModuleSettingUpdate={gameModuleSettingUpdate} 
        updatePlayerActive={updatePlayerActive} />
    
      <div className="App section" onClick={() => navbarOpen ? setNavbarOpen(false) : undefined}>
        <h1 className="title is-3">Let's play!</h1>
        <Game activeGames={gameModuleSettings} gameService={gameService} players={players} gameModuleSerivce={gameModuleSerivce}/>
        <ResetButton />
      </div>
      </div>
    )
  };

}

export default App;
