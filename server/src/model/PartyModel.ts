import mongoose from 'mongoose'
import { IParty } from '../types/Party.js'

const partySchema: mongoose.Schema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

export default mongoose.model<IParty>('Party', partySchema)
