import express, {NextFunction, Request, Response} from 'express';

const clientRouter = express.Router();

clientRouter.use((req: Request, res: Response, next: NextFunction)=> {
    // TODO authentification
    next();
})

clientRouter.get('/load') //TODO loadForm

clientRouter.post('/submit') //submitForm) //TODO
  
export default clientRouter;

