import { Router } from 'express'
import { TriviaController } from '../controller/trivia.js'

const controller = new TriviaController()

const router: Router = Router()

router.get('/', controller.index)

export { router }