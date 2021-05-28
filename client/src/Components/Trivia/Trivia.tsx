import React, { useEffect, useState } from 'react'
import { v1 as uuidv1 } from 'uuid'
import { formatAPIResponseString } from './utils/api-functions'
import { shuffleArray } from './utils/functions'
import './Trivia.css';
import QuestionCard from './QuestionCard';
import { TextGameModuleProps } from '../GameModuleProps';

const Trivia: React.FC<TextGameModuleProps> = ({ gameService, gameEvent, currentPlayers }) => {
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

  const handleAnswer = (e: any) => {
    if (!modefiedGameEvent) {
      return
    }

    if (e.target.innerText === modefiedGameEvent.correct_answer) {
      gameService.addScore(currentPlayers[0]);
      gameService.makeWinnerAlert(currentPlayers[0]);
    } else {
      gameService.makeWinnerAlert(null, 'Wrong answer.');
    }
    gameService.chooseRandomNewGame()
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
      <div id="gameInfo">
        <h4 className="title is-6">Turn to answer a question: </h4>
        <ul>
          <li className="block tag is-medium" data-testid="current-player">{currentPlayers[0].name}</li>
        </ul>
      </div>

      <h2 className="content block" data-testid="game-event">{formatAPIResponseString(gameEvent.question)}</h2>

      <div className="answersDiv is-centered columns">

        {modefiedGameEvent.all_answers.map((answer: string) => {
          return <QuestionCard answer={formatAPIResponseString(answer)} handleAnswer={handleAnswer} key={uuidv1()} />
        })}
      </div>

    </div>
  )
}

export default Trivia;
