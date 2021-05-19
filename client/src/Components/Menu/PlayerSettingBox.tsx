import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlayCircle, faTrashAlt, faEdit, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

const iconDefault = "ml-3 is-clickable"

function PlayerSettingBox({player, updatePlayerActive, deletePlayer, updatePlayerName}: any) {
  const [edit, setEdit] = useState(false)
  const [value, setValue] = useState(player.name)
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  const save = () => {
    if(player.name !== value) updatePlayerName(player.name, value)
    setEdit(false)
  }

  const discard = () => {
    setValue(player.name)
    setEdit(false)
  }

  const confirmDelete = () => {
    deletePlayer(player.name)
    setDeleteConfirm(false)
  }

  const discardDelete = () => {
    setDeleteConfirm(false)
  }

  if(edit) {
    return(
      <div className="box is-flex is-flex-direction-row is-align-items-center is-justify-content-space-between" >
        <input className="input" type="text" value={value} onChange={(e) => setValue(e.target.value)} />
        <div className="btn-group is-flex">
          <FontAwesomeIcon className={`${iconDefault} has-text-success`} icon={faCheck} onClick={() => save()}/>
          <FontAwesomeIcon className={`${iconDefault} has-text-danger`} icon={faTimes} onClick={() => discard()}/>
        </div>
      </div>
    )
  }

  if(deleteConfirm) {
    return(
      <div className="box is-flex is-flex-direction-row is-align-items-center is-justify-content-space-between" >
        <article className="message is-danger m-0">
          <div className="message-header">
            <p>Are you sure to delete?!</p>
          </div>
        </article>
        <div className="btn-group is-flex">
          <FontAwesomeIcon className={`${iconDefault} has-text-success`} icon={faCheck} onClick={() => confirmDelete()}/>
          <FontAwesomeIcon className={`${iconDefault} has-text-danger`} icon={faTimes} onClick={() => discardDelete()}/>
        </div>
      </div>
    )
  }

  return (
    <div className="box is-flex is-flex-direction-row is-align-items-center is-justify-content-space-between" >
      <p className="subtitle m-0">{player.name}</p>      
      <div className="btn-group is-flex">
        <FontAwesomeIcon className={`${iconDefault} has-text-warning`} icon={faEdit} onClick={() => setEdit(true)}/>
        
        {/* Display pause-icon if player is active, else start-icon */}
        {player.isActive ? (
          <FontAwesomeIcon className={`${iconDefault} has-text-warning`} icon={faPause} onClick={() => updatePlayerActive(player.name)}/>
        ) : (
          <FontAwesomeIcon className={`${iconDefault} has-text-success`} icon={faPlayCircle} onClick={() => updatePlayerActive(player.name)}/>
        )}
        
        <FontAwesomeIcon className={`${iconDefault} has-text-danger`} icon={faTrashAlt} onClick={() => setDeleteConfirm(true) }/>
      </div>

    </div>
  );
}

export default PlayerSettingBox;