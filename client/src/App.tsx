import React, { useState } from 'react';
import Login from './Login';
import Game from './Game'
import Player from './Player'
import 'bulma';
import './App.css';
import ResetButton from './ResetButton';
import ErrorMsg from './ErrorMsg';

function App(props: any) {
  const [names, setNames] = useState<Player[]>([]);
  const [play, setPlay] = useState(false);
  const [nameerror, setError] = useState(false);

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
        <div className="App section">
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
      );
    } else {
      return (
        <div className="App section">
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
      );
    }
 
  } else {
    return (
      <div className="App section">
        <h1 className="title is-3">Let's play!</h1>
        <Game players={names} />
        <ResetButton />
      </div>
    )
  }
}

export default App;
