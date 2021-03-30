import express, {NextFunction, Request, Response} from 'express';
import {createForm, createStep, createElement, editForm, editStep, editElement} from '../controllers/form-controler'
import passport from '../services/passport/passport-jwt'

const formRouter = express.Router();
const authenticate = passport.authenticate('jwt', {session: false})

formRouter.post('/createForm', createForm)

formRouter.post('/createStep', authenticate, createStep)

formRouter.post('/createElement', authenticate, createElement)

formRouter.post('/editForm', authenticate, editForm)

formRouter.post('/editStep', authenticate, editStep)

formRouter.post('/editElement', authenticate, editElement)

// formRouter.post('/load', getForm)

// formRouter.post('/delete', deleteForm)
  
export default formRouter;

