import mongoose from 'mongoose'
import { ITrivia } from '../types/trivia'

const triviaSchema: mongoose.Schema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,  
    }
  },
  { timestamps: true }
)

export default mongoose.model<ITrivia>('Trivia', triviaSchema)