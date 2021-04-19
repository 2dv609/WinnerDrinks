import { Router } from "express"
import { PartyController } from '../controller/party.js'

const controller = new PartyController()

const router: Router = Router()

router.get("/", controller.index)

export { router }