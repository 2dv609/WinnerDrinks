import { IMultiQuestion } from '../types/multi-question'
import mongoose from 'mongoose'

const multiQuestionSchema: mongoose.Schema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },  
    type: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,  
    },
    correct_answer: {
      type: String,
      required: true,
    },
    incorrect_answers: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model<IMultiQuestion>('MultiQuestion', multiQuestionSchema)