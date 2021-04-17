import express, {NextFunction, Request, Response} from 'express';
import { saveToSheet } from '../controllers/sheets-controler';
import passport from '../services/passport/passport-jwt'
import FormActions from '../controllers/form-controler'

const clientRouter = express.Router();

const authenticate = passport.authenticate('jwt', {session: false})
//TODO change this authentication

clientRouter.get('/load', authenticate, FormActions.getFullForm) //TODO loadForm

clientRouter.post('/submit', authenticate, saveToSheet) //submitForm) //TODO
  
export default clientRouter;

