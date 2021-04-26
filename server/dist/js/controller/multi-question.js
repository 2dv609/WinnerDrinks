import MultiQuestion from '../model/multi-question.js';
import fetch from 'node-fetch';
export class MultiQuestionController {
    /**
     * Get MultiQuestions questions.
     */
    async index(req, res, next) {
        try {
            const questions = await MultiQuestion.find();
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
     * Load MultiQuestions question to db.
     */
    async loadMultiQuestion() {
        const url = 'https://opentdb.com/api.php?amount=20';
        const response = await fetch(url, { method: 'GET' });
        const resultJSON = await response.json();
        if ('results' in resultJSON) {
            MultiQuestion.insertMany(resultJSON.results);
        }
    }
}
