import { Document } from 'mongoose'

export interface ITrivia extends Document {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]  
}