import React, { useEffect } from 'react'
import './QuestionCard.css';

type Props = {
  answer: string;
  handleAnswer: (e: any) => void;
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