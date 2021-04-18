import { Response, Request, NextFunction } from 'express'
import { ITrivia } from '../types/trivia.js'
import Trivia from '../model/trivia.js'

export class TriviaController {
  /**
   * Load party questions.
   */
   async index (req: Request, res:Response, next:NextFunction) {
    try {

      const questions: ITrivia[] = await Trivia.find()

      res
        .status(201)
        .json({ 
            message: "Trivia questions", 
            questions: questions 
        })
    } catch (error) {
      next(error)
    }
  }
}  