/**
 * Module: server.js
 * The starting point of the application.
 */
import express from "express";
import { dirname } from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { router } from './routes/router.js';
import { connectDB } from './config/connectDB.js';
import { PartyController } from './controller/party.js';
import { MultiQuestionController } from './controller/multi-question.js';
import { TriviaController } from './controller/trivia.js';
import { resolve } from 'path';
/**
 * The main function of the application.
 */
const main = async () => {
    await connectDB();
    // Load game modules
    const partyController = new PartyController();
    const triviaController = new TriviaController();
    const multiQuestionController = new MultiQuestionController();
    const [, , ...gameModules] = process.argv;
    console.log('Load game modules: ' + gameModules);
    if (gameModules.includes('all')) { // load all game modules
        await triviaController.loadTrivia(resolve('data/trivia.json'));
        await partyController.loadParty(resolve('data/party.json'));
        await multiQuestionController.loadMultiQuestion();
    }
    const app = express();
    const directoryFullName = dirname(fileURLToPath(import.meta.url));
    const baseURL = process.env.BASE_URL || '/';
    // Enable body parsing of application/json and populates the request object with a body object (req.body).
    app.use(express.json());
    // Serve static files when production.
    // app.use(express.static(join(directoryFullName, '..', 'public')))
    // Setup and use session middleware (https://github.com/expressjs/session) 
    // Use cors to allow communication between client and server.
    app.use(cors());
    // Register routes.
    app.use('/', router);
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
