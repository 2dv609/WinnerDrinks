import Trivia from '../model/trivia.js';
export class TriviaController {
    /**
     * Load party questions.
     */
    async index(req, res, next) {
        try {
            const questions = await Trivia.find();
            res
                .status(201)
                .json({
                message: "Trivia questions",
                questions: questions
            });
        }
        catch (error) {
            next(error);
        }
    }
}
