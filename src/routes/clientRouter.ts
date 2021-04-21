import express, {NextFunction, Request, Response} from 'express';
import { saveToSheet } from '../controllers/sheets-controler';
import FormActions from '../controllers/form-controler'
import passport from '../services/passport/passport-client'


const authenticate = passport.authenticate('client', {session: false})

const clientRouter = express.Router();

clientRouter.get('/loadForm', FormActions.loadForm) //TODO loadForm

clientRouter.post('/submit', authenticate, saveToSheet) //submitForm) //TODO
  
export default clientRouter;

