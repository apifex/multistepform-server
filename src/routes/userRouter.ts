import express, {NextFunction, Request, Response} from 'express';
import {signUp, signIn} from '../controllers/user-controler'
const userRouter = express.Router();

userRouter.use((req: Request, res: Response, next: NextFunction)=> {
    // TODO authentification
    next();
})

userRouter.get('/signin', signIn)

userRouter.get('/signup', signUp)
  
export default userRouter;

