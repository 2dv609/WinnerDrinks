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
    <div>
      <div className={'questionDiv'}
        onClick={handleAnswer}>
        {answer}
      </div>
    </div>
  );
}

export default QuestionCard;