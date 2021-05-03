import { Document } from 'mongoose'

export interface IMultiQuestion extends Document {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]  
}