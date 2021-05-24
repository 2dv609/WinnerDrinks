import { Response, Request, NextFunction } from 'express'
import { ITrivia } from '../types/Trivia.js'
import Trivia from '../model/TriviaModel.js'
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
          message: 'Trivia questions',
          questions: questions
        })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Load trivia question to db.
   */
  async loadTrivia (dataSource: string): Promise<void> {
    const data: ITrivia[] = await fs.readJson(dataSource)
    await Trivia.deleteMany({})
    await Trivia.insertMany(data)
  }
}
