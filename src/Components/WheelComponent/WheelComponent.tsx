import React, { useState } from 'react';
import GameProps from '../GameProps';
import './WheelComponent.css'

const DEG = 360
const colors = ['#9ede73', '#f7ea00', '#e48900', '#be0000']
const TIME = 3

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
 * 
 * @param {Array} users Array of participant names. 
 * @returns {jsx} Component
 */
function WheelComponent(props: any) {
  // Error checking number of users. If < 4 => duplicate one of the users / If > 4 => skip one of the users
  const gp: GameProps = props.gp;
  const list = gp.getPlayers(4);
  const rotateDeg = DEG / list.length
  const [isReset, setIsReset] = useState(true)
  const [result, setResult] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  
  /**
   * Function that generate random integer in span (min and max included).
   * @param {Number} min Min number
   * @param {Number} max Max number
   * @returns {Number} Random number generated
   */
  const randomIntFromInterval = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);

  /**
   * Function that generates random degrees that the wheel will spin.
   * @param {Number} index Index of the winning element
   * @returns {Number} Degrees generated
   */
  const getRandomRotationDegrees = (index: number): number => {
    let degreeWinner: number = 0;
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
      setErrorMessage('')

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
   * Function that gets and sets the winner.
   * @param {Number} index 
   */
  const getWinner = (index: number) => {
    const winner = list[index]
    console.log(`Winning value is: ${winner.toString()}`)
    setResult(`${winner.toString()} won!`)
    reset();

    gp.addScore(winner, 1)
    gp.makeWinnerAlert(winner)
    gp.chooseRandomNewGame()

  }

  /**
   * Function that resets the wheel and values.
   */
  const reset = () => {
    try {
      let styleSheet = document.styleSheets[0];
      styleSheet.deleteRule(2)
      setIsReset(true)
      setErrorMessage('')
      setResult('')
    } catch (error) {
      console.log('Stylesheet has already been reset...')
      setErrorMessage('Stylesheet has already been reset...')
    }
  }

  return (
    
    <div className="WheelComponent">
      <span style={{margin: '0px'}}>|</span>
      <div onClick={startSpin} className="wheel" style={style}>
      {list.map((val, index) => {
        const degree = (index * rotateDeg) //- 45
        
        return (
          <div key={index} style={{transform: `rotate(${degree}deg)`, borderRight: `200px solid ${colors[index]}`}} className="arrow">
            <span>{val.toString()}</span>
          </div>
        )
      })}
      </div>
      <div className="d-flex">
        <button onClick={startSpin}>Spin!</button>
      </div>
      <div>
        <p>{errorMessage}</p>
        <p>{result}</p>
      </div>
    </div>
  )
}

export default WheelComponent;