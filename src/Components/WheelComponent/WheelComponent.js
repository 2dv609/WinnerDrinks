import React, { useEffect, useState } from 'react';
import './WheelComponent.css'
import Winwheel from 'winwheel'
import { render } from '@testing-library/react';


function WheelComponent(props) {
  const deg = 360
  const list = [1, 2, 3, 4]
  const rotateDeg = deg / list.length
  
  const getRandomRotationDegrees = () => {
    const random = Math.floor(Math.random() * 10) * deg + 1
    return random
  }

  useEffect(() => {

  }, [])
  
  const startSpin = () => {
    const random = getRandomRotationDegrees()

    let styleSheet = document.styleSheets[0];
    
    let keyframes =
    `
    @keyframes spin {
      from {transform:rotate(0deg);}
      to {transform:rotate(${random}deg);}
    }`

    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    console.log(styleSheet)
  }

  const calculateResult = () => {
    return
  }

  let style = {
    animationName: 'spin',
    animationTimingFunction: 'ease-in-out',
    animationDuration: '3s',
    animationDelay: '0.0s',
    animationIterationCount: 1,
    animationDirection: 'normal',
    animationFillMode: 'forwards'
  };

  return (
    
    <div>
      <div className="wheel" style={style/* {animation: `spin ${4}s linear 1`} */}>
      {list.map((val, index) => {
        const de = index * rotateDeg
        return <div key={index} style={{transform: `rotate(${de}deg)`}} className="arrow"><span>{val}</span></div>
      })}
    </div>
    <button onClick={startSpin}>Spin!</button>
    </div>
  )
}

export default WheelComponent;