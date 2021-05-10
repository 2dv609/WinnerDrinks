import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlayCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

function PlayerSettingBox({player, updatePlayerActive, deletePlayer}: any) {

  return (
    <div className="box is-flex is-flex-direction-row is-align-items-center is-justify-content-space-between" >
      <p className="subtitle" style={{margin: '0'}}>{player.name}</p>
      <div className="btn-group" style={{display: 'flex'}}>
        <FontAwesomeIcon color={player.isActive ? 'orange' : 'blue'} icon={player.isActive ? faPause : faPlayCircle} cursor="pointer" onClick={() => updatePlayerActive(player.name)}/>
        <FontAwesomeIcon color="red" className="ml-3" icon={faTrashAlt} cursor="pointer" onClick={() => deletePlayer(player.name) }/>
      </div>
    </div>
  );
}

export default PlayerSettingBox;