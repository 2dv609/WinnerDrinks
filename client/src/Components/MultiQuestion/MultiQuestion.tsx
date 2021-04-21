import React, { useEffect, useState } from 'react'
import { uuid } from 'uuidv4'
import { formatAPIResponseString } from './utils/api-functions'
import { shuffleArray } from './utils/functions'
import './MultiQuestion.css';
import QuestionCard from './QuestionCard';
import { Question } from './types/types';
import GameProps from '../GameProps';
import { getOneTrivia } from '../../API'

const NUM_OF_PLAYERS = 1;

const MultiQuestion = (props: any) => {
  const gp: GameProps = props.gp;
  const [players, setPlayers] = useState(gp.getPlayers(NUM_OF_PLAYERS));
  const [loadedQuestions, setLoadedQuestions] = useState<Question[]>([]);
  const [questionNumber, setQuestionNumber] = useState<number>(0);

  useEffect(() => {
    loadNewQuestions()
  }, [])

  useEffect(() => {
    return () => { // Return a function for code cleanup. This will set new players 
      setPlayers(gp.getPlayers(NUM_OF_PLAYERS));
    }
  }, [gp])

  const loadNewQuestions = async () => {
    // let questions: Question[] = await fetchQuestions(1);
    
    let { data }: Question[] | any  = await getOneTrivia()
    console.log(data)

    let all_answers
    all_answers = data.questions.incorrect_answers
    all_answers.push(data.questions.correct_answer)
    all_answers = shuffleArray(all_answers)
    data.questions.all_answers = all_answers
    setLoadedQuestions([data.questions]);
  }

  const handleAnswer = (e: any) => {
    if (e.target.innerText === loadedQuestions[questionNumber].correct_answer) {
      gp.addScore(players[0], 1)
      gp.chooseRandomNewGame()
      gp.makeWinnerAlert(players[0])
    } else {
      setQuestionNumber(questionNumber + 1);
      gp.chooseRandomNewGame()
      gp.makeWinnerAlert(null)
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

export default MultiQuestion;