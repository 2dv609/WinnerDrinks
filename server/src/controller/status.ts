import { Response, Request, NextFunction } from 'express'
import mongoose from 'mongoose'

export class StatusController {

    async index (req: Request, res: Response, next: NextFunction) {
        try {
            res.status(200).json({ connectionAPI: mongoose.connection.readyState })
          } catch (error) {
            next(error)
          }
    }
}
