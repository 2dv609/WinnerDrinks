import React, { useEffect, useState } from 'react'
import { uuid } from 'uuidv4'

import { fetchQuestions, formatAPIResponseString } from './utils/api-functions'
import { shuffleArray } from './utils/functions'
import './MultiQuestion.css';
import QuestionCard from './QuestionCard';
import { Question } from './types/types';
import GameProps from '../GameProps';

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
    let questions: Question[] = await fetchQuestions(1);
    let all_answers
    for (let i = 0; i < questions.length; i++) {
      all_answers = questions[i].incorrect_answers
      all_answers.push(questions[i].correct_answer)
      all_answers = shuffleArray(all_answers)
      questions[i].all_answers = all_answers
    }
    setLoadedQuestions(questions);
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
    <div>
      <div id={'gameInfo'}>
        <h4>Turn to answer a question: </h4>
        <ul>
          <li>{players[0].name}</li>
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