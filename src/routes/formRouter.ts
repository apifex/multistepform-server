import express from 'express';
import {createForm, getForm, updateForm, deleteForm} from '../controllers/form-controler'
import passport from '../services/passport/passport-jwt'

const formRouter = express.Router();
const authenticate = passport.authenticate('jwt', {session: false})

formRouter.post('/create', authenticate, createForm)

formRouter.post('/update', authenticate, updateForm)

formRouter.get('/get', authenticate, getForm)

formRouter.post('/delete', authenticate, deleteForm)
  
export default formRouter;

