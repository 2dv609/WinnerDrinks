import { Response, Request, NextFunction } from 'express'
import { IBackToBack } from '../types/back-to-back.js'
import BackToBack from '../model/back-to-back.js'
import fs from 'fs-extra'

export class BackToBackController {
  /**
   * Get back to back questions.
   */
  async index (req: Request, res:Response, next:NextFunction) {
    try {

      const questions: IBackToBack[] = await BackToBack.find()

      res
        .status(200)
        .json({ 
            message: 'Back to back questions', 
            questions: questions 
        })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Load back to back questions to db.
   */
   async loadBackToBack (dataSource: string): Promise<void> {
    const data: IBackToBack = await fs.readJson(dataSource)
    await BackToBack.deleteMany({})
    await BackToBack.insertMany(data)
  }
}  