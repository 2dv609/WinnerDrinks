import React, { useEffect, useState } from 'react';
import './WheelComponent.css'
import { AnimationGameModuleProps } from '../GameModuleProps'
import Player from '../../model/Player';

const DEG = 360
const colors = ['#9ede73', '#f7ea00', '#e48900', '#be0000']
const TIME = 3

const style = {
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
 * Function that generate random integer in span (min and max included).
 * @param {Number} min Min number
 * @param {Number} max Max number
 * @returns {Number} Random number generated
 */
const randomIntFromInterval = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);

/**
 *
 * @param {Array} users Array of participant names.
 * @returns {jsx} Component
 */
const WheelComponent: React.FC<AnimationGameModuleProps> = ({ gameService, currentPlayers }) =>  {

  const [loading, setLoading] = useState(true)
  const [rotateDeg, setRotateDeg] = useState(0)
  const [isReset, setIsReset] = useState(true)

  /**
   * Function run once on render an every time gameService is changed.
   * Function check how many players there are in the game and duplicate if they are too few.
   */
  useEffect(() => {
    setRotateDeg(DEG / currentPlayers.length)
    setLoading(false)

  }, [currentPlayers.length])

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

      const winnerIndex = randomIntFromInterval(1, currentPlayers.length) - 1
      const degrees = getRandomRotationDegrees(winnerIndex)

      const styleSheet = document.styleSheets[0];

      const keyframes = `
      @keyframes spin {
        from {transform:rotate(0deg);}
        to {transform:rotate(${degrees}deg);}
      }`

      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

      setTimeout(() => getWinner(winnerIndex), (TIME) * 1000 + 500);
    } else {
      console.log('Please reset the wheel...')
    }

    setIsReset(false)
  }

  /**
   * Function that call correct gameService methods with winner object.
   * @param winner
   */
  const addScore = (winner: Player) => {
    gameService.addScore(winner)
    gameService.makeWinnerAlert(winner)
    gameService.chooseRandomNewGame()
  }

  /**
   * Function that gets and sets the winner.
   * @param {Number} index
   */
  const getWinner = (index: number) => {
    const aWinner = currentPlayers[index]
    reset();
    addScore(aWinner)
  }

  /**
   * Function that resets the wheel and values.
   */
  const reset = () => {
    try {
      const styleSheet = document.styleSheets[0];
      // styleSheet.deleteRule(2)
      styleSheet.deleteRule(styleSheet.cssRules.length - 1)

      setIsReset(true)
    } catch (error) {
      console.log('Stylesheet has already been reset...')
    }
  }

  if(loading) return(<p>Loading...</p>)

  return (
    <div className="WheelComponent">
      <span style={{ margin: '0px' }}>|</span>
      <div onClick={startSpin} className="wheel" style={style}>

        {currentPlayers.map((player: Player, index: number) => {
          const degree = (index * rotateDeg) // - 45

          return (
            <div key={index} style={{ transform: `rotate(${degree}deg)`, borderRight: `150px solid ${colors[index]}` }} className="arrow">
              <span data-testid={`wheel-section-${index}`}>{player.toString()}</span>
            </div>
          )
        })}
      </div>

      {/*
        <div className="d-flex">
          <button onClick={startSpin}>Spin!</button>
        </div>
        <div>
          <p>{errorMessage}</p>
          <p>{result}</p>
        </div>
      */}
    </div>
  )
}

export default WheelComponent;
