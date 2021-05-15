import { Router } from 'express';
import { PartyController } from '../controller/PartyController.js';
const controller = new PartyController();
const router = Router();
router.get('/', controller.index);
export { router };
