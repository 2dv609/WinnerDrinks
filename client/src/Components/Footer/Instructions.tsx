import React, { useState } from 'react';

function Instructions() {
  const [isActive, setActive] = useState('')
  return (
    <div className="column">
      <div className="button" onClick={() => setActive(' is-active')}>Instructions</div>
      <div className={`modal${isActive}`}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">How to use this app</p>
            <button className="delete" onClick={() => setActive('')} aria-label="close" />
          </header>
          <section className="modal-card-body">
            <h5>Set up</h5>
            <p>
              Start by adding some players. You need to be at least 2 people.
              Their names must be 1-10 characters long and not contain any spaces.
              You can add, delete and pause players later.
            </p>
            <p>
              Select a game mode. In standard mode, the goal of the game is to
              win sips of your drink. Unlike a traditional drinking game, drinking is not
              a punishment. The
              {' '}
              <i>Winner Drinks</i>
              !
            </p>
            <p>
              If you don't fancy drinking but still want to play this game, you can choose
              the highscore mode instead. Instead of handing out sips, the game will
              keep track of your score. Maybe decide on a goal, the first to get 10 points wins?
            </p>
            <h5>Game play</h5>
            <p>
              Each round, a player is randomly selected to play a minigame.
              There are 4 minigames:
            </p>
            <h6>Wheel</h6>
            <p>Click the wheel to spin it. A random player wins.</p>
            <h6>Party</h6>
            <p>Two players get to compete in a challenge. One of them wins.</p>
            <h6>BackToBack</h6>
            <p>
              Two players get a fact. They should place themselves back to back so
              that they don't see the other player. They should then individually
              figure out who that fact applies the most to. Count to three
              and point at yourself or the other player to show who you thought of.
              If they both selected the same person, they both win.
              Otherwise, they both lose.
              This minigame is only available if there are 3 active players.
            </p>
            <h6>Trivia</h6>
            <p>A person gets to answer a trivia question.</p>
            <p>If you don't like a question or challenge, you can always skip it.</p>
            <p>
              During the game, you can press the menu button in the top left corner of the screen.
              If a new person joins the party, you can add them.
              If someone visits the bathroom, you can pause them.
              If someone leaves, you can delete them.
              There's also the possibility to disable a minigame.
              Don't fancy trivia questions? Disable it!
            </p>
            <h5>End</h5>
            <p>There's no end. You must keep playing this game forever. Have fun and drink responsibly! </p>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={() => setActive('')}>Got it!</button>

          </footer>
        </div>
      </div>
    </div>

  );
}

export default Instructions;
