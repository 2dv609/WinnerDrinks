import React, { useEffect, useState } from 'react';
import './WheelComponent.css'
import Winwheel from 'winwheel'
import { render } from '@testing-library/react';


function WheelComponent(props) {
  const deg = 360
  const list = [0, 1, 2, 3]
  const colors = ['9ede73', 'f7ea00', 'e48900', 'be0000']
  const rotateDeg = deg / list.length
  const time = 3
  const [degreeResult, setDegreeResult] = useState(null)
  
  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const getRandomRotationDegrees = (index) => {

    let degreeWinner;
    switch(index) {
      case(0):
        degreeWinner = randomIntFromInterval(226, 315)
        break
      case(1):
        degreeWinner = randomIntFromInterval(136, 225)

        break
      case(2):
        degreeWinner = randomIntFromInterval(46, 135)

        break
      case(3):
        degreeWinner = randomIntFromInterval(0, 45)
        break
      default:
      break
    }

    const rotateDegrees = 360 * 4 + degreeWinner
    return rotateDegrees
  }
  
  const startSpin = () => {
    const winnerIndex = randomIntFromInterval(1, list.length) - 1 // int of index of winner in array
    console.log('Winner: ' + list[winnerIndex])
    const random = getRandomRotationDegrees(winnerIndex)
  
    let styleSheet = document.styleSheets[0];
      
    let keyframes = `
    @keyframes spin {
      from {transform:rotate(0deg);}
      to {transform:rotate(${random}deg);}
    }`
  
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
  
    setTimeout(() => getWinner(winnerIndex), (time) * 1000 + 500);
  }

  const getWinner = (index) => {
    const winner = list[index]
    console.log('Winner value: ' + list[index])
    return
  }

  let style = {
    animationName: 'spin',
    animationTimingFunction: 'ease-in-out',
    animationDuration: `${time}s`,
    animationDelay: '0.0s',
    animationIterationCount: 1,
    animationDirection: 'normal',
    animationFillMode: 'forwards'
  };

  const reset = () => {
    setDegreeResult(null)
    let styleSheet = document.styleSheets[0];
    // styleSheet.removeRule()
    styleSheet.deleteRule(2)

    console.log(styleSheet)
  }

  return (
    
    <div>
      <div className="wheel" style={style}>
      {list.map((val, index) => {
        console.log(index)
        const de = (index * rotateDeg) //- 45
        
        return (
          <div key={index} style={{transform: `rotate(${de}deg)`, borderRight: `200px solid #${colors[index]}`}} className="arrow"><span>{val}</span></div>
        )
      })}
    </div>
    <button onClick={startSpin}>Spin!</button>
    <button onClick={reset}>Reset!</button>
    </div>
  )
}

export default WheelComponent;