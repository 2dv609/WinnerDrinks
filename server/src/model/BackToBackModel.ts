import mongoose from 'mongoose'
import { IBackToBack } from '../types/BackToBack.js'

const backToBackSchema: mongoose.Schema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

export default mongoose.model<IBackToBack>('BackToBack', backToBackSchema)
