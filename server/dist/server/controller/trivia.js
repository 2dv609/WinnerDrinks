import Trivia from '../model/trivia.js';
// import fetch from 'node-fetch'
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
        /* const url: string = 'https://opentdb.com/api.php?amount=20'
     
        const response = await fetch(url, {method: 'GET'})
        const resultJSON = await response.json()
    
        if ('results' in resultJSON) {
          MultiQuestion.insertMany(resultJSON.results)
        } */
        const data = await fs.readJson(dataSource);
        Trivia.insertMany(data);
    }
}
