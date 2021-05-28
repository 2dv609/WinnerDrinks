/**
 * Shown at the starting page where the user can add new players and set the game mode.
 */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

type LoginProps = {
  addUser: (newPlayerName: string) => void
}

const Login: React.FC<LoginProps> = ({ addUser }) => {
  const [input, setInput] = useState('');
  return (
    <div className="">
      <div className="control block">
        <FontAwesomeIcon
          className="ml-3 is-clickable has-text-success"
          data-testid="add-user-button"
          icon={faUserPlus}
          size="2x"
          onClick={(): void => {
            addUser(input)
            setInput('')
          }} />
      </div>
      <div className="control block">
        <input
          className="input has-text-centered"
          type="text"
          placeholder="Add players"
          value={input}
          name="newname"
          id="newname"
          onChange={(e): void => {
            if ((e.target as any).value.length > 10) return;
            setInput((e.target as any).value);
          }}
          onKeyUp={(e): void => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addUser(input)
              setInput('')
            }
          }}
          data-testid="player-name-field"
        />
      </div>

    </div>
  );
}

export default Login;
