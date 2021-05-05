import { Response, Request, NextFunction } from 'express'
import { ITrivia } from '../types/trivia.js'
import Trivia from '../model/trivia.js'
// import fetch from 'node-fetch'
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
   async loadTrivia (dataSource: string): Promise<void>  {
    /* const url: string = 'https://opentdb.com/api.php?amount=20'
 
    const response = await fetch(url, {method: 'GET'})
    const resultJSON = await response.json()

    if ('results' in resultJSON) {
      MultiQuestion.insertMany(resultJSON.results)
    } */

    const data: ITrivia[] = await fs.readJson(dataSource)
    Trivia.insertMany(data)
  }
}  