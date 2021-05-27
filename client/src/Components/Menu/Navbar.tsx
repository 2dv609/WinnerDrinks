/**
 * Menu for configuring various settings.
 * @author Caesar
 */
import React, { useState } from 'react';
import './Navbar.css'
import Player from '../../model/Player'
import PlayerSettingBox from './PlayerSettingBox';
import ResetButton from '../../App/ResetButton';
import { IGameModuleSetting } from '../../model/GameModule'

export type NavbarProps = {
  updatePlayerName: any,
  navbarOpen: boolean,
  players: Player[],
  gameModuleSettings: IGameModuleSetting[],
  updatePlayerActive: (playerName: string) => void,
  setNavBarOpen: (value: boolean) => void,
  onGameModuleSettingUpdate: (gameModuleSettings: IGameModuleSetting[]) => void,
  deleteUser: (userName: string) => void,
  addUser: (newUserName: string) => void
}

const Navbar: React.FC<NavbarProps> = ({
  updatePlayerName, navbarOpen, setNavBarOpen, players, gameModuleSettings,
  updatePlayerActive, onGameModuleSettingUpdate, deleteUser, addUser }) => {
  const [inputName, setInputName] = useState('')

  /**
   * Update active game-modules. Fires of when user clicks on a checkbox in settings-menu.
   */
  const updateActiveGameModule = (e: any, moduleName: string) => {
    e.preventDefault()

    console.log(moduleName)
    let activeModules = 0

    for (let i = 0; i < gameModuleSettings.length; i++) {
      if (gameModuleSettings[i].active) activeModules++
    }

    const copiedArray = [...gameModuleSettings]
    // Error checking, cannot disable if every module is disabled
    for (let i = 0; i < copiedArray.length; i++) {
      if (copiedArray[i].name === moduleName) {
        if (copiedArray[i].active) {
          // 2 game modules must be active!
          if (activeModules === 2) {
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

  return (
    <nav>
      <div id="navDiv" className={`links ${(navbarOpen ? ' nav-open' : '')}`}>
        {/* Bulma menu */}
        <aside className="menu is-flex is-flex-direction-column p-3" style={{ height: '100%' }}>

          <div className="level is-mobile">
            <div className="level-left">
              <h2 className="subtitle level-item">Settings</h2>
            </div>
            <div className="level-right">
              {/* Delete button for closing the menu. @author Delfi */}
              <button
                className="delete level-item"
                onClick={() => {
                  setNavBarOpen(false)
                  document.querySelector('#navDiv')?.classList.toggle('nav-open');
                }}>
                Close
              </button>
            </div>
          </div>

          {/* Game module settings */}
          <p className="menu-label">Game Modules</p>
          <ul className="menu-list">
            {gameModuleSettings.map((module: IGameModuleSetting, index: number) => {
              return (
                <li key={index}>
                  <a href="/" onClick={(e: any) => module.enable ? updateActiveGameModule(e, module.name) : e.preventDefault()}>
                    <label className="checkbox mr-3">
                      <input type="checkbox" disabled={!module.enable} className="mr-3" onChange={() => (module.active)} checked={module.active} />
                      {module.name}
                    </label>
                  </a>
                </li>
              )
            })}
          </ul>

          <p className="menu-label">Add Player</p>
          {/* Name input */}
          <div className="field has-addons">
            <div className="control">
              <input className="input" type="text" value={inputName} placeholder="Input name" onChange={e => setInputName(e.target.value)} />
            </div>
            <div className="control">
              <button
                className="button is-info"
                onClick={() => {
                  addUser(inputName)
                  setInputName('')
                }}>
                Add
              </button>

            </div>
          </div>
          {/* Names */}
          <p className="menu-label">Players</p>
          <ul className="menu-list" style={{ overflowY: 'scroll' }}>
            {players.map((player: Player, index: number) => {
              return <PlayerSettingBox updatePlayerName={updatePlayerName} deletePlayer={deleteUser} player={player} key={index} updatePlayerActive={updatePlayerActive} />
            })}
          </ul>
          {/* Reset page */}
          <div className="menu-label" />
          <ResetButton />
        </aside>
      </div>
    </nav>
  );
}

export default Navbar;
