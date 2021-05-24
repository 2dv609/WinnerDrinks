import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons'
/* https://fontawesome.com/how-to-use/on-the-web/using-with/react */

function Icon({setNavbarOpen}: {setNavbarOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
  return (
    <div style={{padding: '8px 16px'}}>
      <FontAwesomeIcon icon={faSlidersH} color='#333' size='2x' cursor="pointer" onClick={() => setNavbarOpen(true)}/>
    </div>
  );
}

export default Icon;