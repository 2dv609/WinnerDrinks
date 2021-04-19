import Trivia from '../model/trivia.js';
import fetch from 'node-fetch';
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
                message: "Trivia questions",
                questions: questions
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Get trivia questions.
     */
    async getOneRandom(req, res, next) {
        try {
            const questions = await Trivia.find();
            res
                .status(200)
                .json({
                message: "Trivia questions",
                questions: questions[Math.floor(Math.random() * questions.length)]
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Load trivia question to db.
     */
    async loadTrivia() {
        const url = 'https://opentdb.com/api.php?amount=20';
        const response = await fetch(url, { method: 'GET' });
        const resultJSON = await response.json();
        if ('results' in resultJSON) {
            Trivia.insertMany(resultJSON.results);
        }
    }
}
