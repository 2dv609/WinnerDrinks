import React, { useState } from 'react';
import Login from './Login';
import Game from './Game'
import './App.css';

function App(props: any) {
  const [names, setNames] = useState<string[]>([]);
  const [play, setPlay] = useState(false);

  const addUser = (newUser: string) => {
    console.log(newUser)
    setNames([...names, newUser]);
  };
  if (!play) {
    return (
      <div className="App">
        <Login setter={addUser} />
        <h2>Players</h2>
        <ul>
          {names.map(item =>
            (<li key={item.toString()}>{item}</li>)
          )}
        </ul>
        <input type="button" value="Done" onClick={() => setPlay(true)} />
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1>Nu ska vi leka!</h1>
        <Game players={names} />
      </div>

    )
  }

}


export default App;
