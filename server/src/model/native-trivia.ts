import mongoose from 'mongoose'
import { INativeTrivia } from '../types/native-trivia'

const nativeTriviaSchema: mongoose.Schema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,  
    }
  },
  { timestamps: true }
)

export default mongoose.model<INativeTrivia>('NativeTrivia', nativeTriviaSchema)