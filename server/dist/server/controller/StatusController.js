import mongoose from 'mongoose';
export class StatusController {
    async index(req, res, next) {
        try {
            res.status(200).json({ connectionAPI: mongoose.connection.readyState });
        }
        catch (error) {
            next(error);
        }
    }
}
