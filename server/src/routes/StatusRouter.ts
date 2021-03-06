import { Router } from 'express'
import { StatusController } from '../controller/StatusController.js'

const controller = new StatusController()

const router: Router = Router()

router.get('/', controller.index)

export { router }
