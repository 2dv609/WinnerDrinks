import React, { useState, useEffect } from 'react'
import Login from './Login'
import Game from './Game'
import Player from '../model/Player'
import 'bulma'
import ErrorMsg from './ErrorMsg'
import Navbar from '../Components/Menu/Navbar'
import Icon from '../Components/Menu/Icon'
import IGameModuleService from '../model/IGameModuleService'
import { getGameModuleService, getGameService, getGameModuleSettings } from '../model/ModelFactory'
import GameService from '../model/GameService'
import { IGameModuleSetting } from '../model/GameModule'
import { GameMode } from '../model/GameMode'
import Footer from '../Components/Footer/Footer'

function App() {
  const gameService: GameService = getGameService();
  const [gameModuleService, setGameModuleSerivce] = useState<IGameModuleService>()
  const [players, setPlayers] = useState<Player[]>([]);
  const [play, setPlay] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gameMode, setGameMode] = useState(GameMode.STANDARD);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [gameModuleSettings, setGameModuleSettings] = useState<IGameModuleSetting[]>(getGameModuleSettings);
  const MAX_PLAYERS = 10

  useEffect(() => {
    getGameModuleService().then((gms: IGameModuleService | undefined) => { setGameModuleSerivce(gms) })
  }, []);

  /**
   * Function that deletes an added player by name.
   * @param playerName Name of Player to be deleted from state.
   */
  const deleteUser = (playerName: string): void => {
    /* if (players.length <= 2) {
      // Cannot delete player, just one player left
      // Error checking
      return
    } */
    const updatedPlayers: Player[] = [...players]
    const index = updatedPlayers.findIndex((player: Player) => player.name === playerName)
    if (index >= 0) {
      // Update enabled game module
      if(players.length - 1 <= 2) {
        updateEnableGameModule(false)
      }

      updatedPlayers.splice(index, 1)
      setPlayers(updatedPlayers);
    }
  }

  const updatePlayerName = (currentName: string, newName: string) => {
    try {
      const alreadyAdded = playerExistInArray(newName)
      if (alreadyAdded) {
        activateErrorModal("Player's name already exists in the game!")
        return
      }

      const updatedPlayers: Player[] = [...players]
      updatedPlayers.forEach((player: Player) => player.name === currentName ? player.name = newName : false)
      setPlayers(updatedPlayers)
    } catch (error) {
      activateErrorModal(error.msg)
    }
  }

  const gameModuleSettingUpdate = (gameModuleSettings: IGameModuleSetting[]): void => {
    setGameModuleSettings(gameModuleSettings)
  }

  const updateEnableGameModule = (enable: boolean) => {
    const copiedArray = [...gameModuleSettings]

    for(let i = 0; i < copiedArray.length; i++) {
      if(copiedArray[i].name === 'BackToBack') {
        copiedArray[i].enable = enable
        copiedArray[i].active = enable
      }
    }

    setGameModuleSettings(copiedArray)
  }

  /**
   * Function updating the state of the player. If (s)he is active or paused.
   */
  const updatePlayerActive = (playerName: string): void => {
    const updatedPlayers: Player[] = [...players]
    updatedPlayers.forEach((player) => player.name === playerName ? player.isActive = !player.isActive : false)

    // Update game module back to back
    const activePlayers = gameService.getNumActivePlayers(players)
    const tooFew = activePlayers > 2
    updateEnableGameModule(tooFew)

    setPlayers(updatedPlayers)
  }

  /**
   * Function that checks if an name already exists in added players array
   * @param name Name to be checked
   * @returns boolean, {true} if exists, {false} if not exists
   */
  const playerExistInArray = (name: string) => {
    let exist = false

    for (let i = 0; i < players.length; i++) {
      if (players[i].name.toLowerCase() === name.toLowerCase()) {
        exist = true
        break
      }
    }

    return exist
  }

  const addUser = (newPlayerName: string): void => {
    try {
      if (players.length >= MAX_PLAYERS) {
        activateErrorModal(`Cannot add more players, max players are ${MAX_PLAYERS}`)
        return
      }

      const alreadyAdded = playerExistInArray(newPlayerName)
      if (alreadyAdded) {
        activateErrorModal('Player is already added to the game!')
        return
      }

      const newPlayer = new Player(newPlayerName);

      // Update enabled game module
      if(players.length + 1 > 2) {
        updateEnableGameModule(true)
      }

      setPlayers([...players, newPlayer]);
    } catch (error) {
      activateErrorModal(error.message)
    }
  };

  const activateErrorModal = (msg: string): void => {
    setError(msg)
    modal?.classList.add('is-active')
  }

  // Error message modal variables and listeners
  const doneBtn = document.querySelector('#doneBtn')
  const modalBg= document.querySelector('.modal-background')
  const modal= document.querySelector('.modal')

  doneBtn?.addEventListener('click', ()=> {
    modal?.classList.add('is-active')
  })

  modalBg?.addEventListener('click', ()=> {
    modal?.classList.remove('is-active')
  })

  if (!gameModuleService) {
    return (<h1 className="section container">
      <progress className="progress is-large is-info" max="100">Loading</progress>
    </h1>)
  }

  if (!play) {
    return (
      <div>
        {/* Navbar */}
        <Icon setNavbarOpen={setNavbarOpen} />
        <Navbar
          updatePlayerName={updatePlayerName}
          navbarOpen={navbarOpen}
          setNavBarOpen={setNavbarOpen}
          players={players}
          gameModuleSettings={gameModuleSettings}
          addUser={addUser}
          deleteUser={deleteUser}
          onGameModuleSettingUpdate={gameModuleSettingUpdate}
          updatePlayerActive={updatePlayerActive} />

        <div className="App section" onClick={() => navbarOpen ? setNavbarOpen(false) : undefined}>
          <div className="box">
            <Login addUser={addUser} />
            <div className="control block">
              <div className="block"></div>
              <input id="doneBtn" className="button" type="button" value="Done" onClick={() => {
                // must be at least two players. 
                if (players.length < 2 || players == null) {
                  setError("There needs to be at least two players to start the game!");
                } else {
                  setPlay(true);
                }
              }} />
            </div>
              
            {/* Error message modal */}
            {/* <ErrorMsg message={error}></ErrorMsg> */}

            <div className="modal">
              <div className="modal-background"></div>
                <div className="modal-content has-background-warning py-5 px-5">
                  <div className="is-size-4">ERROR</div>
                  <div className="is-size-5">{error}</div>
                </div>
              <button className="modal-close is-large" aria-label="close"></button>
            </div>

            {/* Select Game mode: Standard or Highscore */}
            <div className="control select">
              <select name="gamemode" id="gamemode" onChange={e => {
                e.target.value === 'Standard' ? setGameMode(GameMode.STANDARD) : setGameMode(GameMode.HIGHSCORE)
              }}>
                <option value="Standard">Standard</option>
                <option value="Highscore">Highscore</option>
              </select>
            </div>
            <div className="block"></div>

            <h2 className="title is-5" >Players</h2>
            <ul className="columns">
              {players.map(player =>
                (<li className="column" key={player.toString()}>{player.toString()}</li>)
              )}
            </ul>
          </div>
        </div>
      
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        {/* Navbar */}
        <Icon setNavbarOpen={setNavbarOpen} />
        <Navbar
          updatePlayerName={updatePlayerName}
          navbarOpen={navbarOpen}
          setNavBarOpen={setNavbarOpen}
          players={players}
          gameModuleSettings={gameModuleSettings}
          addUser={addUser}
          deleteUser={deleteUser}
          onGameModuleSettingUpdate={gameModuleSettingUpdate}
          updatePlayerActive={updatePlayerActive} />

        <div className="App section" onClick={() => navbarOpen ? setNavbarOpen(false) : undefined}>
          <h1 className="title is-3">WinnerDrinks</h1>
          <Game activeGames={gameModuleSettings} gameMode={gameMode} gameService={gameService} players={players} gameModuleService={gameModuleService} />
        </div>
      </div>
    )
  };

}

export default App;
