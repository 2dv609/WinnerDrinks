import Party from '../model/PartyModel.js';
import fs from 'fs-extra';
export class PartyController {
    /**
     * Get party questions.
     */
    async index(req, res, next) {
        try {
            const questions = await Party.find();
            res
                .status(200)
                .json({
                message: 'Party questions',
                questions: questions
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Load party question to db.
     */
    async loadParty(dataSource) {
        const data = await fs.readJson(dataSource);
        await Party.deleteMany({});
        await Party.insertMany(data);
    }
}
