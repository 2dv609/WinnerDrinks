import mongoose from 'mongoose'
import { IBackToBack } from '../types/back-to-back'

const backToBackSchema: mongoose.Schema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,  
    }
  },
  { timestamps: true }
)

export default mongoose.model<IBackToBack>('BackToBack', backToBackSchema)