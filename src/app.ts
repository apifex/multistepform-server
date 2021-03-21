import 'dotenv/config'
import express, {NextFunction, Request, Response} from 'express'
import cors from 'cors'
import userRouter from './routes/userRouter'
import formRouter from './routes/formRouter'
import clientRouter from './routes/clientRouter'
import db from './settings/mongoConnection'

// start server
const port = process.env.PORT || 5000
const server = express()
  server.use(cors())
  server.use('/api/client', clientRouter)
  server.use('/api/user', userRouter)
  server.use('/api/form', formRouter)
//services

console.log(db)
server.listen(port, ()=> console.log('listening on port 4000'));