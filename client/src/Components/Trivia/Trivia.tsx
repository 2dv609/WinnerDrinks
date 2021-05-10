import React, { useEffect, useState } from 'react'
import { uuid } from 'uuidv4'
import { formatAPIResponseString } from './utils/api-functions'
import { shuffleArray } from './utils/functions'
import './Trivia.css';
import QuestionCard from './QuestionCard';
import { TextGameModuleProps } from '../GameModueProps';

const NUM_OF_PLAYERS = 1;

const Trivia: React.FC<TextGameModuleProps> = ({ gameService, gameEvent}) => {
  const [players, setPlayers] = useState(gameService.getPlayers(NUM_OF_PLAYERS, gameService.players));
  const [modefiedGameEvent, setModefiedGameEvent] = useState<ITrivia>();

  useEffect(() => {
    let all_answers
    if ('incorrect_answers' in gameEvent) {
      all_answers = gameEvent.incorrect_answers
      all_answers.push(gameEvent.correct_answer)
      all_answers = shuffleArray(all_answers)
      gameEvent.all_answers = all_answers
      setModefiedGameEvent(gameEvent);
    }
  }, [gameEvent])

  useEffect(() => {
    return () => { // Return a function for code cleanup. This will set new players 
      setPlayers(gameService.getPlayers(NUM_OF_PLAYERS, gameService.players))
    }
  }, [gameService])


  const handleAnswer = (e: any) => {
    if (!modefiedGameEvent) {
      return
    }

    if (e.target.innerText === modefiedGameEvent.correct_answer) {
      gameService.addScore(players[0], 1)
      gameService.chooseRandomNewGame()
      gameService.makeWinnerAlert(players[0])
    } else {
      gameService.chooseRandomNewGame()
      gameService.makeWinnerAlert(null)
    }
  }

  if (!modefiedGameEvent) {
    return (
      <button 
        className="button" 
        onClick={() => {
        gameService.makeWinnerAlert(null)
        gameService.chooseRandomNewGame()
        }}>
        Triva question could not be loaded!
    </button>
    )
  }

  return (
    <div className="box">
      <div id={'gameInfo'}>
        <h4>Turn to answer a question: </h4>
        <ul>
          <li className="card" >{players[0].name}</li>
        </ul>
      </div>

      <br />
      <h2>{formatAPIResponseString(gameEvent.question)}</h2>

      <div className={'answersDiv'}>
        <br />
        {modefiedGameEvent.all_answers.map((answer: string) => {
          return <QuestionCard answer={formatAPIResponseString(answer)} handleAnswer={handleAnswer} key={uuid()} />
        })}
      </div>

    </div>
  )
}

export default Trivia;