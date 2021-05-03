import React, { useState } from 'react';
import Login from './Login';
import Game from './Game'
import Player from './Player'
import 'bulma';
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
      <div className="App section">
        {console.log('PUBLIC_URL')}
        {console.log(process.env.PUBLIC_URL)}
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
  } else {
    return (
      <div className="App section">
        <h1 className="title is-3">Let's play!</h1>
        <Game players={names} />
        <ResetButton></ResetButton>
      </div>

    )
  }

}

export default App;
