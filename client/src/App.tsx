import React, { useState } from 'react';
import Login from './Login';
import Game from './Game'
import Player from './Player'
import './App.css';
import ResetButton from './ResetButton';

function App(props: any) {
  const [names, setNames] = useState<Player[]>([]);
  const [play, setPlay] = useState(false);

  const addUser = (newUserName: string) => {
    const newUser = new Player(newUserName);
    setNames([...names, newUser]);
  };
  if (!play) {
    return (
      <div className="App">
        <Login setter={addUser} />
        <h2>Players</h2>
        <ul>
          {names.map(item =>
            (<li key={item.toString()}>{item.toString()}</li>)
          )}
        </ul>
        <input type="button" value="Done" onClick={() => {
          if (names.length < 2) return; // must be at least two players. 
          setPlay(true); 
        }} />
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1>Let's play!</h1>
        <Game players={names} />
        <ResetButton></ResetButton>
      </div>

    )
  }

}

export default App;
