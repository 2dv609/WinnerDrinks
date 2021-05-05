import { Response, Request, NextFunction } from 'express'
import { IParty } from '../types/party.js'
import Party from '../model/party.js'
import fs from 'fs-extra'

export class PartyController {
  /**
   * Get party questions.
   */
  async index (req: Request, res: Response, next: NextFunction) {
    try {

      const questions: IParty[] = await Party.find()

      res
        .status(200)
        .json({ 
            message: 'Party questions', 
            questions: questions 
        })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Load party question to db.
   */
   async loadParty (dataSource: string): Promise<void> {
    const data = await fs.readJson(dataSource)
    Party.insertMany(data)
  }
}  