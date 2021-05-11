import React, { useState } from 'react';
import './Navbar.css'
import Player from '../../model/Player'
// import 'bulma/css/bulma.css'
import PlayerSettingBox from './PlayerSettingBox';

export interface IGameModuleSetting {
  name: string,
  active: boolean,
  index: number
}

export type NavbarProps = {
  navbarOpen: boolean,
  players: Player[],
  gameModuleSettings: IGameModuleSetting[],
  updatePlayerActive: (playerName: string) => void,
  onGameModuleSettingUpdate: (gameModuleSettings: IGameModuleSetting[]) => void,
  deleteUser: (userName: string) => void,
  addUser: (newUserName: string) => void
}

const Navbar: React.FC<NavbarProps> = ({ 
  navbarOpen, players, gameModuleSettings, 
  updatePlayerActive, onGameModuleSettingUpdate, deleteUser, addUser }) => {

  const [inputName, setInputName] = useState('')

  /**
   * Update active game-modules. Fires of when user clicks on a checkbox in settings-menu.
   */
  const updateActiveGameModule = (e: any, moduleName: string) => {
    e.preventDefault()

    let activeModules = 0

    for(let i = 0; i < gameModuleSettings.length; i++) {
      if(gameModuleSettings[i].active) activeModules++
    }

    const copiedArray = [...gameModuleSettings]
    // Error checking, cannot disable if every module is disabled
    for(let i = 0; i < copiedArray.length; i++) {
      if(copiedArray[i].name === moduleName) {
        if(copiedArray[i].active) {
          // 2 game modules must be active!
          if(activeModules === 2) {
            console.log('Atleast 2 game modules must be enabled')
            return
          }
        }

        copiedArray[i].active = !copiedArray[i].active
        break;
      }
    }
    onGameModuleSettingUpdate(copiedArray)    
  }

  /**
   * Function that calls delete-player function in parent-component after error-checking.
   */
  const deletePlayer = (playerName: string) => {
    if (players.length <= 2) {
      // Cannot delete player, just one player left
      // Error checking
      return
    }
    deleteUser(playerName)
  }
  
  return (
    <nav>
      <div className={("links ") +  (navbarOpen ? "nav-open" : "")}>
        {/* Bulma menu */}
        <aside className="menu is-flex is-flex-direction-column" style={{padding: '12px', height: '100%'}}>
          <h2 className="subtitle">Settings</h2>

          {/* Game module settings */}
          <p className="menu-label">Game Modules</p>
          <ul className="menu-list">
            {gameModuleSettings.map((module: IGameModuleSetting, index: number) => {
              return (
              <li key={index}>
                <a href="/" onClick={(e: any) => updateActiveGameModule(e, module.name)}>
                  <label className="checkbox"><input type="checkbox" onChange={() => (module.active)} checked={module.active} style={{marginRight: '8px'}}/>{module.name} Module</label>
                </a>
              </li>)
            })}
          </ul>

          <p className="menu-label">Add Player</p>
          {/* Name input */}
          <div className="field has-addons">
            <div className="control">
              <input className="input" type="text" placeholder="Input name" onChange={e => setInputName(e.target.value)} />
            </div>
            <div className="control">
              <button className="button is-info" onClick={() => addUser(inputName)}>Add</button>
            </div>
          </div>
          {/* Names */}
          <p className="menu-label">Players</p>
          <ul className="menu-list" style={{overflowY: 'scroll'}}>
            {players.map((player: Player, index: number) => {
              return <PlayerSettingBox deletePlayer={deletePlayer} player={player} key={index} updatePlayerActive={updatePlayerActive}/>
            })}
          </ul>
        </aside>
      </div>
    </nav>
  );
}

export default Navbar;