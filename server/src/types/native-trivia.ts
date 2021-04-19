import { Document } from 'mongoose'

export interface INativeTrivia extends Document {
  question: string
}