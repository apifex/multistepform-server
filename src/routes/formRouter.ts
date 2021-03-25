import express, {NextFunction, Request, Response} from 'express';
import {createForm, getForm, updateForm, deleteForm} from '../controllers/form-controler'

const formRouter = express.Router();

formRouter.use((req: Request, res: Response, next: NextFunction)=> {
    // TODO: authentification
    next();
})


formRouter.post('/create', createForm)

formRouter.post('/update', updateForm)

formRouter.get('/get', getForm)

formRouter.post('/delete', deleteForm)
  
export default formRouter;

