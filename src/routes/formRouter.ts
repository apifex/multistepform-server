import express, {NextFunction, Request, Response} from 'express';
import {createForm, getForm, updateForm, deleteForm} from '../controllers/form-controler'
import {authenticate} from '../services/passport/authenticate'

const formRouter = express.Router();

// formRouter.use((req: Request, res: Response, next: NextFunction)=> {
//     authenticate(req, res, next)
//     next();
// })

formRouter.post('/create', authenticate, createForm)

formRouter.post('/update', authenticate, updateForm)

formRouter.get('/get', authenticate, getForm)

formRouter.post('/delete', authenticate, deleteForm)
  
export default formRouter;

