import React, { useEffect, useState } from 'react'
import { uuid } from 'uuidv4'
import { formatAPIResponseString } from './utils/api-functions'
import { shuffleArray } from './utils/functions'
import './Trivia.css';
import QuestionCard from './QuestionCard';
import GameProps from '../GameProps';

const NUM_OF_PLAYERS = 1;

const Trivia = (props: any) => {
  const gp: GameProps = props.gp;
  const [players, setPlayers] = useState(gp.getPlayers(NUM_OF_PLAYERS));
  const [loadedQuestions, setLoadedQuestions] = useState<ITrivia[]>([]);
  const [questionNumber, setQuestionNumber] = useState<number>(0);

  useEffect(() => {
    console.log(props.event)
    loadNewQuestions()
  }, [])

  useEffect(() => {
    return () => { // Return a function for code cleanup. This will set new players 
      setPlayers(gp.getPlayers(NUM_OF_PLAYERS));
    }
  }, [gp])

  const loadNewQuestions = async () => {
    const gameEvent: ITrivia = props.gameEvent
    let all_answers
    all_answers = gameEvent.incorrect_answers
    all_answers.push(gameEvent.correct_answer)
    all_answers = shuffleArray(all_answers)
    gameEvent.all_answers = all_answers
    setLoadedQuestions([gameEvent]);
  }

  const handleAnswer = (e: any) => {
    if (e.target.innerText === loadedQuestions[questionNumber].correct_answer) {
      gp.addScore(players[0], 1)
      gp.chooseRandomNewGame()
      gp.makeWinnerAlert(players[0])
    } else {
      setQuestionNumber(questionNumber + 1);
      gp.chooseRandomNewGame()
      gp.makeWinnerAlert(null, "Wrong answer!")
    }
  }

  return (
    <div className="box">
      <div id={'gameInfo'}>
        <h4>Turn to answer a question: </h4>
        <ul>
          <li className="card" >{players[0].name}</li>
        </ul>
        {/* {players.length > 0 && (
          <ul>
            {players.map((player, i) => {
              return <li key={uuid()}>{player.name}</li>
            })}
          </ul>
        )} */}
      </div>

      <br />
      {loadedQuestions.length > 0 && (<h2>{formatAPIResponseString(loadedQuestions[questionNumber].question)}</h2>)}

      {(loadedQuestions.length > 0) ?
        <div className={'answersDiv'}>
          <br />
          {loadedQuestions[questionNumber].all_answers.map((answerString) => {
            return <QuestionCard answer={formatAPIResponseString(answerString)} handleAnswer={handleAnswer} key={uuid()} />
          })}
        </div>
        : <h4>Loading questions</h4>}

    </div>
  );
}

export default Trivia;