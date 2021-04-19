import { Response, Request, NextFunction } from 'express'
import { INativeTrivia } from '../types/native-trivia.js'
import NativeTrivia from '../model/native-trivia.js'
import fs from 'fs-extra'

export class NativeTriviaController {
  /**
   * Get native trivia questions.
   */
  async index (req: Request, res:Response, next:NextFunction) {
    try {

      const questions: INativeTrivia[] = await NativeTrivia.find()

      res
        .status(200)
        .json({ 
            message: "Native trivia questions", 
            questions: questions 
        })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Get native trivia questions.
   */
   async getOneRandom (req: Request, res:Response, next:NextFunction) {
    try {

      const questions: INativeTrivia[] = await NativeTrivia.find()

      res
        .status(200)
        .json({ 
            message: "Native trivia questions", 
            questions: questions[Math.floor(Math.random() * questions.length)] 
        })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Load native trivia questions to db.
   */
   async loadNativeTrivia (dataSource: string): Promise<void> {
    const data = await fs.readJson(dataSource)
    NativeTrivia.insertMany(data)
  }
}  