import { Response, Request, NextFunction } from 'express'
import { ITrivia } from '../types/trivia.js'
import Trivia from '../model/trivia.js'
import fs from 'fs-extra'

export class TriviaController {
  /**
   * Get trivia questions.
   */
  async index (req: Request, res:Response, next:NextFunction) {
    try {

      const questions: ITrivia[] = await Trivia.find()

      res
        .status(200)
        .json({ 
            message: "Trivia questions", 
            questions: questions 
        })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Load trivia questions to db.
   */
   async loadTrivia (dataSource: string): Promise<void> {
    const data = await fs.readJson(dataSource)
    Trivia.insertMany(data)
  }
}  