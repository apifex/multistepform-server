import express, {NextFunction, Request, Response} from 'express';

const clientRouter = express.Router();

clientRouter.use((req: Request, res: Response, next: NextFunction)=> {
    // TODO authentification
    next();
})

const errorHandlar = (req: Request, res: Response, next: NextFunction) => {
    try{
      return next ()
    } catch (err) {
        console.log(err)
      res.status(500).send("error catched")
    }
  }

clientRouter.get('/load', errorHandlar, (req: Request, res: Response) => {
    res.send('load form')
})

clientRouter.post('/submit', errorHandlar, (req: Request, res: Response) => {
    res.send('submit form')
})
  
export default clientRouter;

