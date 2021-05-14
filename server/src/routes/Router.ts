import express, { Response, Request, NextFunction } from 'express'
import { router as partyRouter } from './PartyRouter.js'
import { router as triviaRouter } from './TriviaRouter.js'
import { router as backToBackRouter } from './BackToBackRouter.js'
import { router as statusRouter } from './StatusRouter.js'

export const router = express.Router()

router.use('/party', partyRouter)
router.use('/trivia', triviaRouter)
router.use('/back-to-back', backToBackRouter)
router.use('/status', statusRouter)

router.use('*', (req: Request, res: Response, next: NextFunction) => {
  res
    .status(404)
    .json({
      message: 'No valid path.'
    })
})
