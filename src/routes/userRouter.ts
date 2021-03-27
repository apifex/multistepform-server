import express, {NextFunction, Request, Response} from 'express';

import passport from 'passport'
import passportGoogle from '../services/passport/passport-google'
import {authenticate} from '../services/passport/authenticate'
import {signup, login, protectedRoute, socialAuth} from '../controllers/auth-controler'
const userRouter = express.Router();

// userRouter.use((req: Request, res: Response, next: NextFunction)=> {
//     // TODO authentification
//     next();
// })

userRouter.get(
    "/google",
    passportGoogle.authenticate("google", {
      scope: ["profile", "email"],
      session: false,
    })
  );
  
userRouter.get('/google/callback',
    passportGoogle.authenticate('google', {
      failureRedirect: '/hello',
      session: false,
    }),
    socialAuth
 );

userRouter.post('/login', login)

userRouter.post('/signup', signup)

userRouter.get('/restricted', authenticate, protectedRoute)
  
export default userRouter;

