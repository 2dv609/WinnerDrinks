import { Router } from 'express';
import { StatusController } from '../controller/status.js';
const controller = new StatusController();
const router = Router();
router.get('/', controller.index);
export { router };
