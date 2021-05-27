/**
 * A component that renders the winners of a game, if any.
 *
 * @author Delfi Sehidic
 */

import React from 'react';
import Player from '../model/Player'

type WinnerAlertProps = {
    winners: Player[] | null,
    message: string | undefined
}

const WinnerAlert: React.FC<WinnerAlertProps> = ({ winners, message }) => {
  if (winners == null) { // Null means that no one won anything.
    return (
      <div className="message is-danger">
        <div className="message-body">{message || 'No points awarded'}</div>
      </div>

    )
  } else if (winners.length === 1) { // If there is only one winner....
    return (
      <div className="message is-success">
        <div className="message-body">
          {message || 'Have a sip, '}
          {' '}
          {winners[0].toString()}
        </div>
      </div>

    );
  } else if (winners.length > 1) { // If there are several winners, display them all.
    return (
      <div className="message is-success">
        <div className="message-header">{message || 'A sip each to: '}</div>
        <div className="message-body">
          {winners.map((item: Player, index: number) => (<div key={index} className="">{item.toString()}</div>))}
        </div>
      </div>

    );
  } else {
    // Initial state. No winner or loser, just an empty span.
    return (
      <span style={{ display: 'none' }} />
    );
  }
}

export default WinnerAlert;
