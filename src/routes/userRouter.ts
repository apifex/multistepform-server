import express, {NextFunction, Request, Response} from 'express';

const userRouter = express.Router();

userRouter.use((req: Request, res: Response, next: NextFunction)=> {
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

userRouter.get('/login', errorHandlar, (req: Request, res: Response) => {
    res.send('login to server')
})

userRouter.get('/signup', errorHandlar, (req: Request, res: Response) => {
    res.send('signup to server')
})

userRouter.get('/login', errorHandlar, (req: Request, res: Response) => {
    res.send('login to server')
})
  
export default userRouter;

