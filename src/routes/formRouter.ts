import express from 'express';
import FormActions from '../controllers/form-controler'
import {createSpreadsheet, saveToSheet, formatSheet} from '../controllers/sheets-controler'
import passport from '../services/passport/passport-jwt'

const formRouter = express.Router();

const authenticate = passport.authenticate('jwt', {session: false})

formRouter.post('/createForm', authenticate, FormActions.createForm)

formRouter.post('/createStep', authenticate, FormActions.createStep)

formRouter.post('/createElement', authenticate, FormActions.createElement)

formRouter.post('/editForm', authenticate, FormActions.editForm)

formRouter.post('/deleteForm', authenticate, FormActions.deleteForm)

formRouter.post('/editStep', authenticate, FormActions.editStepPosition)

formRouter.post('/deleteStep', authenticate, FormActions.deleteStep)

formRouter.post('/editElement', authenticate, FormActions.editElement)

formRouter.post('/deleteElement', authenticate, FormActions.deleteElement)

formRouter.get('/getForm', authenticate, FormActions.getForm)

formRouter.get('/getFormList', authenticate, FormActions.getFormList)

formRouter.get('/getStep', authenticate, FormActions.getStep)

formRouter.post('/createSpreadsheet', authenticate, createSpreadsheet)

formRouter.post('/saveToSheet', authenticate, saveToSheet)

formRouter.post('/formatSheet', authenticate, formatSheet)

// formRouter.post('/load', getForm)

// formRouter.post('/delete', deleteForm)
  
export default formRouter;

