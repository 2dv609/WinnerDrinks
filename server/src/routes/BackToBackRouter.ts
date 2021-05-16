import { Router } from 'express'
import { BackToBackController } from '../controller/BackToBackController.js'

const controller = new BackToBackController()

const router: Router = Router()

router.get('/', controller.index)

export { router }
