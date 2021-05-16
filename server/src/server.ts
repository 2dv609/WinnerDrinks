/**
 * Module: server.js
 * The starting point of the application.
 */
import express, { Request, Response, NextFunction } from 'express'
import { dirname, join } from 'path'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { router } from './routes/Router.js'
import { connectDB } from './config/ConnectDB.js'
import HttpException from './common/HttpException.js'
import { PartyController } from './controller/PartyController.js'
import { TriviaController } from './controller/TriviaController.js'
import { BackToBackController } from './controller/BackToBackController.js'

/**
 * The main function of the server.
 */
const main = async (): Promise<void> => {
  // Connect to mongodb
  await connectDB()

  // Express app
  const app = express()

  // Concert url to path for root dir
  const directoryFullName = dirname(fileURLToPath(import.meta.url))

  // Load game modules
  const partyController: PartyController = new PartyController()
  const backToBackController: BackToBackController = new BackToBackController()
  const triviaController: TriviaController = new TriviaController()

  // Load game if NODE_ENV === 'production' or process argument is set to all.
  const [,, ...gameModules] = process.argv
  if (gameModules.includes('all') || app.get('env') === 'production') { // load all game modules
    await backToBackController.loadBackToBack(join(directoryFullName, '../data/back-to-back.json'))
    await partyController.loadParty(join(directoryFullName, '../data/party.json'))
    await triviaController.loadTrivia(join(directoryFullName, '../data/trivia.json'))
  }

  // Enable body parsing of application/json and populates the request object with a body object (req.body).
  app.use(express.json())

  // Use cors to allow communication between client and server.
  app.use(cors())

  // Serve static files when production and trust first proxy.
  if (app.get('env') === 'production') {
    app.set('trust proxy', 1)
    app.use(express.static(join(directoryFullName, '../client')))
  }

  // Register routes.
  app.use('/api', router)

  // Error handler.
  const errorHandler = (error: HttpException, request: Request, response: Response, next: NextFunction) => {
    console.log(`${error.message}: ${error.stack}`)
    const status = error.statusCode || error.status || 500
    response.status(status).send(`${error.message}: ${error.stack}`)
  }

  // Use cors to (during development)
  app.use(errorHandler)

  // Starts the HTTP server listening for connections.
  const portNr : string | undefined = process.env.PORT
  app.listen(portNr, () => {
    console.log(`WinnerDrinks listen at port: ${portNr}`)
  })
}

main().catch(console.error)
