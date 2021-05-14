import { Document } from 'mongoose'

export interface IParty extends Document {
  question: string
}
