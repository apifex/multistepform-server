import express, {NextFunction, Request, Response} from 'express';

const formRouter = express.Router();

formRouter.use((req: Request, res: Response, next: NextFunction)=> {
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

formRouter.post('/create', errorHandlar, (req: Request, res: Response) => {
    res.send('create form')
})

formRouter.post('/update', errorHandlar, (req: Request, res: Response) => {
    res.send('upadate form ')
})

formRouter.post('/load', errorHandlar, (req: Request, res: Response) => {
    res.send('load form')
})

formRouter.post('/delete', errorHandlar, (req: Request, res: Response) => {
    res.send('delete form')
})
  
export default formRouter;

