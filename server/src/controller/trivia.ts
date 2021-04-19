import { Response, Request, NextFunction } from 'express'
import { ITrivia } from '../types/trivia.js'
import Trivia from '../model/trivia.js'
import fetch from 'node-fetch'

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
   * Get one random trivia questions.
   */
   async getOneRandom (req: Request, res:Response, next:NextFunction) {
    try {

      const questions: ITrivia[] = await Trivia.find()

      res
        .status(200)
        .json({ 
            message: "Trivia questions", 
            questions: questions[Math.floor(Math.random() * questions.length)] 
        })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Load trivia question to db.
   */
   async loadTrivia (): Promise<void>  {
    const url: string = 'https://opentdb.com/api.php?amount=20'
 
    const response = await fetch(url, {method: 'GET'})
    const resultJSON = await response.json()

    if ('results' in resultJSON) {
      Trivia.insertMany(resultJSON.results)
    }
  }
}  