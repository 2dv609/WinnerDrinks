import { Router } from "express";
import { NativeTriviaController } from '../controller/native-trivia.js';
const controller = new NativeTriviaController();
const router = Router();
router.get("/", controller.index);
router.get("/one", controller.getOneRandom);
export { router };
