import { Document } from 'mongoose'

export interface ITrivia extends Document {
  question: string
}