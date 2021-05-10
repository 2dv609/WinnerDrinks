import React, { useState } from 'react';
import Login from './Login';
import Game from './Game'
import Player from './Player'
import 'bulma';
import './App.css';
import ResetButton from './ResetButton';
import ErrorMsg from './ErrorMsg';
import Navbar from './Components/Menu/Navbar';
import Icon from './Components/Menu/Icon';

function App(props: any) {
  const [names, setNames] = useState<Player[]>([]);
  const [play, setPlay] = useState(false);
  const [nameerror, setError] = useState(false);

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [gameModules, setGameModules] = useState([
    { name: 'Wheel', active: true, index: 0 },
    { name: 'Party', active: true, index: 1 }, 
    { name: 'BackToBack', active: true, index: 2 }, 
    { name: 'Trivia', active: true, index: 3 }, 
  ])

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

  /**
   * Function updating the state of the player. If (s)he is active or paused.
   */
  const updatePlayerActive = (playerName: string) => {
    const namesCopy = [...names]
    namesCopy.forEach((player) => player.name === playerName ? player.isActive = !player.isActive : false)
    setNames(namesCopy)
  }

  const addUser = (newUserName: string) => {
    try {
      const newUser = new Player(newUserName);
      setNames([...names, newUser]);
    } catch (error) {
      window.alert(error) //For now.
    }
  };

  if (!play) {
    if (!nameerror) {
      return (
        <div>

        {/* Navbar */}
        <Icon setNavbarOpen={setNavbarOpen} />
        <Navbar addUser={addUser} deleteUser={deleteUser} gameModules={gameModules} setGameModules={setGameModules} names={names} navbarOpen={navbarOpen} updatePlayerActive={updatePlayerActive} />
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
        <Navbar addUser={addUser} deleteUser={deleteUser} gameModules={gameModules} setGameModules={setGameModules} names={names} navbarOpen={navbarOpen} updatePlayerActive={updatePlayerActive} />
        
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
      <Navbar addUser={addUser} deleteUser={deleteUser} gameModules={gameModules} setGameModules={setGameModules} names={names} navbarOpen={navbarOpen} updatePlayerActive={updatePlayerActive} />
    
      <div className="App section" onClick={() => navbarOpen ? setNavbarOpen(false) : undefined}>
        <h1 className="title is-3">Let's play!</h1>
        <Game players={names} activeModules={gameModules} />
        <ResetButton />
      </div>
      </div>
    )
  };

}

export default App;
