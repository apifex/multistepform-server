import {config} from 'dotenv'
import express from 'express'
import cors from 'cors'
import passport from 'passport';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRouter'
import formRouter from './routes/formRouter'
import clientRouter from './routes/clientRouter'
import {userErrorsHandler, formErrorsHandler} from './services/errorHandler'
import {connectToDb} from './services/mongoConnection'

config()
// configure server
const PORT = process.env.PORT || 5000

const server = express()
  server.use(cors({credentials: true}))
  server.use(express.json())
  server.use(express.urlencoded({extended: true}))
  server.use(cookieParser())
  
  server.use(passport.initialize())
  
  server.use('/api/client', clientRouter)
  server.use('/api/user', userRouter) 
  server.use('/api/form', formRouter) //auth.required 
  server.use(formErrorsHandler)
  server.use(userErrorsHandler)

  
  
// test
  server.get('/test', (req, res)=> {res.send('server works')})
  
// connect to db
connectToDb().then(()=>
  server.listen(PORT, ()=> console.log(`server is listening on port ${PORT}`))
)

