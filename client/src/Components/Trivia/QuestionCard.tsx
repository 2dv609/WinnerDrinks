import React, { useEffect, useState } from 'react'
import './QuestionCard.css';

type Props = {
  answer: string;
  handleAnswer: any;
}

const QuestionCard: React.FC<Props> = ({ answer, handleAnswer }) => {

  useEffect(() => {
  }, [])

  return (

      <div className={'questionDiv card'}
        onClick={handleAnswer}>
        {answer}
      </div>

  );
}

export default QuestionCard;