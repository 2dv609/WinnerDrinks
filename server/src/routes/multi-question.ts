import { Router } from "express"
import { MultiQuestionController } from '../controller/multi-question.js'

const controller = new MultiQuestionController()

const router: Router = Router()

router.get("/", controller.index)

export { router }