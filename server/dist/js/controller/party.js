import Party from '../model/party.js';
export class PartyController {
    /**
     * Load party questions.
     */
    async index(req, res, next) {
        try {
            const questions = await Party.find();
            res
                .status(201)
                .json({
                message: "Party questions",
                questions: questions
            });
        }
        catch (error) {
            next(error);
        }
    }
}
