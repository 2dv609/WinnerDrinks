import React from 'react'
import './QuestionCard.css';

type Props = {
  answer: string;
  handleAnswer: (e: any) => void;
}

const QuestionCard: React.FC<Props> = ({ answer, handleAnswer }) => {
  return (
    <div className="column">
      <div
        className="button is-info is-light"
        onClick={handleAnswer}
        data-testid="answer-alternatives">
        {answer}
      </div>
    </div>
  );
}

export default QuestionCard;
