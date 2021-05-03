import { Response, Request, NextFunction } from 'express'
import { IMultiQuestion } from '../types/multi-question.js'
import MultiQuestion from '../model/multi-question.js'
// import fetch from 'node-fetch'
import fs from 'fs-extra'

export class MultiQuestionController {
  /**
   * Get MultiQuestions questions.
   */
   async index (req: Request, res:Response, next:NextFunction) {
    try {

      const questions: IMultiQuestion[] = await MultiQuestion.find()

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
   * Load MultiQuestions question to db.
   */
   async loadMultiQuestion (dataSource: string): Promise<void>  {
    /* const url: string = 'https://opentdb.com/api.php?amount=20'
 
    const response = await fetch(url, {method: 'GET'})
    const resultJSON = await response.json()

    if ('results' in resultJSON) {
      MultiQuestion.insertMany(resultJSON.results)
    } */

    const data: IMultiQuestion[] = await fs.readJson(dataSource)
    MultiQuestion.insertMany(data)
  }
}  