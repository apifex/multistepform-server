import express, {NextFunction, Request, Response} from 'express';
import {createForm, createStep, createElement, editForm, editStepPosition, editElement, getForm, getFormList, getStep} from '../controllers/form-controler'
import passport from '../services/passport/passport-jwt'

const formRouter = express.Router();
const authenticate = passport.authenticate('jwt', {session: false})

formRouter.post('/createForm', authenticate, createForm)

formRouter.post('/createStep', authenticate, createStep)

formRouter.post('/createElement', authenticate, createElement)

formRouter.post('/editForm', authenticate, editForm)

formRouter.post('/editStep', authenticate, editStepPosition)

formRouter.post('/editElement', authenticate, editElement)

formRouter.get('/getForm', authenticate, getForm)

formRouter.get('/getFormList', authenticate, getFormList)

formRouter.get('/getStep', authenticate, getStep)


// formRouter.post('/load', getForm)

// formRouter.post('/delete', deleteForm)
  
export default formRouter;

