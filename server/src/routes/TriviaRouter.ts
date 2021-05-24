import { Router } from 'express'
import { TriviaController } from '../controller/TriviaController.js'

const controller = new TriviaController()

const router: Router = Router()

router.get('/', controller.index)

export { router }
