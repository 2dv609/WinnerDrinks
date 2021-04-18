import { Response, Request, NextFunction } from 'express'
import { IParty } from '../types/party.js'
import Party from '../model/party.js'

export class PartyController {
  /**
   * Load party questions.
   */
  async index (req: Request, res:Response, next:NextFunction) {
    try {

      const questions: IParty[] = await Party.find()

      res
        .status(201)
        .json({ 
            message: "Party questions", 
            questions: questions 
        })
    } catch (error) {
      next(error)
    }
  }
}  