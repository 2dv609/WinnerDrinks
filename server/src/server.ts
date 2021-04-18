/**
 * Module: server.js
 * The starting point of the application.
 */
import express, { Request, Response, NextFunction } from "express";
import { dirname, join } from 'path'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { router } from './routes/router.js'
import { connectDB } from './config/connectDB.js'
import HttpException from './common/http-exception.js'
 
/**
 * The main function of the application.
 */
const main = async (): Promise<void> => {

  await connectDB()

  const app = express()
  const directoryFullName = dirname(fileURLToPath(import.meta.url))
  const baseURL = process.env.BASE_URL || '/'
 
  // Enable body parsing of application/json and populates the request object with a body object (req.body).
  app.use(express.json())

 
  // Serve static files.
  // app.use(express.static(join(directoryFullName, '..', 'public')))
 
  // Setup and use session middleware (https://github.com/expressjs/session)
 
  
  // Register routes.
  app.use(cors())

  // say hello from serve
  /* const helloFromServer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log('hello from server')
      res.status(200).json({ server: "Hello from server" })
      next()
    } catch (error) {
      next(error)
    }
  }
  app.use(helloFromServer) */
 
  app.use('/', router)
 
  // Error handler.

  
  const errorHandler = (error: HttpException, request: Request, response: Response, next: NextFunction ) => {
      console.log(`${error.message}: ${error.stack}`)
      const status = error.statusCode || error.status || 500;  
      response.status(status).send(`${error.message}: ${error.stack}`);
  };
  app.use(errorHandler)
 
  // Starts the HTTP server listening for connections.
  // Socket.io: Using server instead of express
  const portNr : string | undefined = process.env.PORT

  console.log(portNr)

  app.listen(portNr, () => {
    console.log(`Server running at http://localhost:${portNr}`)
    console.log('Press Ctrl-C to terminate...')
  })
}
 
main().catch(console.error)
