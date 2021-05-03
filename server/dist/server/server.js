/**
 * Module: server.js
 * The starting point of the application.
 */
import express from 'express';
import { dirname, join } from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { router } from './routes/router.js';
import { connectDB } from './config/connectDB.js';
import { PartyController } from './controller/party.js';
import { TriviaController } from './controller/trivia.js';
import { BackToBackController } from './controller/back-to-back.js';
/**
 * The main function of the server.
 */
const main = async () => {
    await connectDB();
    // Load game modules
    const partyController = new PartyController();
    const backToBackController = new BackToBackController();
    const triviaController = new TriviaController();
    const [, , ...gameModules] = process.argv;
    const app = express();
    const directoryFullName = dirname(fileURLToPath(import.meta.url));
    if (gameModules.includes('all') || app.get('env') === 'production') { // load all game modules
        console.log('Load game modules...');
        await backToBackController.loadBackToBack(join(directoryFullName, 'data/back-to-back.json'));
        await partyController.loadParty(join(directoryFullName, 'data/party.json'));
        await triviaController.loadTrivia(join(directoryFullName, 'data/trivia.json'));
    }
    //const baseURL = process.env.BASE_URL || '/'
    app.use((req, res, next) => {
        console.log(req.originalUrl);
        next();
    });
    // Enable body parsing of application/json and populates the request object with a body object (req.body).
    app.use(express.json());
    // Use cors to allow communication between client and server.
    app.use(cors());
    // Serve static files when production and trust first proxy.
    if (app.get('env') === 'production') {
        app.set('trust proxy', 1);
        app.use(express.static(join(directoryFullName, '../build')));
    }
    // Register routes.
    app.use('/api', router);
    // Error handler.
    const errorHandler = (error, request, response, next) => {
        console.log(`${error.message}: ${error.stack}`);
        const status = error.statusCode || error.status || 500;
        response.status(status).send(`${error.message}: ${error.stack}`);
    };
    app.use(errorHandler);
    // Starts the HTTP server listening for connections.
    // Socket.io: Using server instead of express
    const portNr = process.env.PORT;
    console.log(portNr);
    app.listen(portNr, () => {
        console.log(`Server running at http://localhost:${portNr}`);
        console.log('Press Ctrl-C to terminate...');
    });
};
main().catch(console.error);
