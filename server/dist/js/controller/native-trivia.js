import NativeTrivia from '../model/native-trivia.js';
import fs from 'fs-extra';
export class NativeTriviaController {
    /**
     * Get native trivia questions.
     */
    async index(req, res, next) {
        try {
            const questions = await NativeTrivia.find();
            res
                .status(200)
                .json({
                message: "Native trivia questions",
                questions: questions
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Get native trivia questions.
     */
    async getOneRandom(req, res, next) {
        try {
            const questions = await NativeTrivia.find();
            res
                .status(200)
                .json({
                message: "Native trivia questions",
                questions: questions[Math.floor(Math.random() * questions.length)]
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Load native trivia questions to db.
     */
    async loadNativeTrivia(dataSource) {
        const data = await fs.readJson(dataSource);
        NativeTrivia.insertMany(data);
    }
}
