import 'dotenv/config'
import express, {NextFunction, Request, Response} from 'express'
import cors from 'cors'
import userRouter from './routes/userRouter'
import formRouter from './routes/formRouter'
import clientRouter from './routes/clientRouter'
import {userErrorsHandler, formErrorsHandler} from './services/errorHandler'
import db, {connectToDb} from './services/mongoConnection'


// configure server
const PORT = process.env.PORT || 5000
const server = express()
  server.use(cors())
  server.use(express.json())
  server.use(express.urlencoded({extended: true}))
  
  server.get('/test', (req, res)=> {res.send('server works')})
  
  server.use('/api/client', clientRouter)
  server.use('/api/user', userRouter) 
  server.use('/api/form', formRouter) //auth.required
  server.use(formErrorsHandler)
  server.use(userErrorsHandler)
  

// connect to db
connectToDb().then(()=>
  server.listen(PORT, ()=> console.log(`server is listening on port ${PORT}`))
)

