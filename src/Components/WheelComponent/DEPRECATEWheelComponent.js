import React, { useState } from 'react';
import './WheelComponent.css'

const DEG = 360
const colors = ['#9ede73', '#f7ea00', '#e48900', '#be0000']
const TIME = 3

function WheelComponent(props) {
  const list = [0, 1, 2, 3]
  const rotateDeg = DEG / list.length
  const [isReset, setIsReset] = useState(true)
  const [result, setResult] = useState(undefined)
  const [errorMessage, setErrorMessage] = useState(undefined)
  
  /**
   * Function that generate random integer in span (min and max included).
   * @param {Number} min Min number
   * @param {Number} max Max number
   * @returns {Number} Random number generated
   */
  const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  /**
   * Function that generates random degrees that the wheel will spin.
   * @param {Number} index Index of the winning element
   * @returns {Number} Degrees generated
   */
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
  
  /**
   * Function that is called when user click spin-button.
   * Calls the other function and set the winner.
   */
  const startSpin = () => {
    if(isReset) {
      setErrorMessage(undefined)

      const winnerIndex = randomIntFromInterval(1, list.length) - 1
      const degrees = getRandomRotationDegrees(winnerIndex)
    
      let styleSheet = document.styleSheets[0];

      let keyframes = `
      @keyframes spin {
        from {transform:rotate(0deg);}
        to {transform:rotate(${degrees}deg);}
      }`
    
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    
      setTimeout(() => getWinner(winnerIndex), (TIME) * 1000 + 500);
    } else {
      setErrorMessage('Please reset the wheel...')
      console.log('Please reset the wheel...')
    }

    setIsReset(false)
  }

  /**
   * Function that get and set the winner.
   * @param {Number} index 
   */
  const getWinner = (index) => {
    const winner = list[index]
    console.log(`Winning value: ${winner}`)
    setResult(`${winner} won!`)
  }

  let style = {
    animationName: 'spin',
    animationTimingFunction: 'ease-in-out',
    animationDuration: `${TIME}s`,
    animationDelay: '0.0s',
    animationIterationCount: 1,
    animationDirection: 'normal',
    animationFillMode: 'forwards',
    marginBottom: '2rem'
  };

  /**
   * Function that resets the wheel and values.
   */
  const reset = () => {
    try {
      let styleSheet = document.styleSheets[0];
      styleSheet.deleteRule(2)
      setIsReset(true)
      setErrorMessage(undefined)
      setResult(undefined)
    } catch (error) {
      console.log('Stylesheet has already been reset...')
      setErrorMessage('Stylesheet has already been reset...')
    }
  }

  return (
    
    <div className="WheelComponent">
      <span style={{margin: '0px'}}>|</span>
      <div className="wheel" style={style}>
      {list.map((val, index) => {
        const degree = (index * rotateDeg) //- 45
        
        return (
          <div key={index} style={{transform: `rotate(${degree}deg)`, borderRight: `200px solid ${colors[index]}`}} className="arrow">
            <span>{val}</span>
          </div>
        )
      })}
      </div>
      <div className="d-flex">
        <button onClick={startSpin}>Spin!</button>
        <button onClick={reset}>Reset!</button>
      </div>
      <div>
        <p>{!errorMessage ? '' : errorMessage}</p>
        <p>{!result ? '' : result}</p>
      </div>
    </div>
  )
}

export default WheelComponent;