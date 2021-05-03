import { Router } from "express"
import { BackToBackController } from '../controller/back-to-back.js'

const controller = new BackToBackController()

const router: Router = Router()

router.get("/", controller.index)

export { router }