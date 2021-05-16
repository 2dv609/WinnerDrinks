import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlayCircle, faTrashAlt, faEdit, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

function PlayerSettingBox({player, updatePlayerActive, deletePlayer, updatePlayerName}: any) {
  const [edit, setEdit] = useState(false)
  const [value, setValue] = useState(player.name)

  const save = () => {
    console.log(player.name, value)
    if(player.name !== value){
      updatePlayerName(player.name, value)
    }
    setEdit(false)
  }

  const discard = () => {
    setValue(player.name)
    setEdit(false)
  }

  return (
    <div className="box is-flex is-flex-direction-row is-align-items-center is-justify-content-space-between" >
      {edit ? (
        <input className="input" type="text" value={value} onChange={(e) => setValue(e.target.value)} />
        ) : (
        <p className="subtitle" style={{margin: '0'}}>{player.name}</p>
      )}
        {edit ? (
          <div className="btn-group" style={{display: 'flex'}}>
          <FontAwesomeIcon color='green' className="ml-3" icon={faCheck} cursor="pointer" onClick={() => save()}/>
          <FontAwesomeIcon color='red' className="ml-3" icon={faTimes} cursor="pointer" onClick={() => discard()}/>
          </div>
        ) : (
          <div className="btn-group" style={{display: 'flex'}}>
          <FontAwesomeIcon color='orange' icon={faEdit} cursor="pointer" onClick={() => setEdit(true)}/>
          <FontAwesomeIcon color={player.isActive ? 'orange' : 'blue'} className="ml-3" icon={player.isActive ? faPause : faPlayCircle} cursor="pointer" onClick={() => updatePlayerActive(player.name)}/>
          <FontAwesomeIcon color="red" className="ml-3" icon={faTrashAlt} cursor="pointer" onClick={() => deletePlayer(player.name) }/>
          </div>
        )}
    </div>
  );
}

export default PlayerSettingBox;