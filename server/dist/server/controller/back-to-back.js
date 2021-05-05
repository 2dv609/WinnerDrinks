import BackToBack from '../model/back-to-back.js';
import fs from 'fs-extra';
export class BackToBackController {
    /**
     * Get back to back questions.
     */
    async index(req, res, next) {
        try {
            const questions = await BackToBack.find();
            res
                .status(200)
                .json({
                message: 'Back to back questions',
                questions: questions
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Load back to back questions to db.
     */
    async loadBackToBack(dataSource) {
        const data = await fs.readJson(dataSource);
        BackToBack.insertMany(data);
    }
}
