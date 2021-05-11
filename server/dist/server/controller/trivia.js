import Trivia from '../model/trivia.js';
import fs from 'fs-extra';
export class TriviaController {
    /**
     * Get trivia questions.
     */
    async index(req, res, next) {
        try {
            const questions = await Trivia.find();
            res
                .status(200)
                .json({
                message: 'Trivia questions',
                questions: questions
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Load trivia question to db.
     */
    async loadTrivia(dataSource) {
        const data = await fs.readJson(dataSource);
        await Trivia.deleteMany({});
        await Trivia.insertMany(data);
    }
}
