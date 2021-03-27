import express, {NextFunction, Request, Response} from 'express';
import {authenticate} from '../services/passport/authenticate'
import {signup, login, protectedRoute} from '../controllers/auth-controler'
const userRouter = express.Router();

// userRouter.use((req: Request, res: Response, next: NextFunction)=> {
//     // TODO authentification
//     next();
// })

userRouter.post('/login', login)

userRouter.post('/signup', signup)

userRouter.get('/restricted', authenticate, protectedRoute)
  
export default userRouter;

