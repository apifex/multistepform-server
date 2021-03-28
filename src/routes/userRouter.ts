import express, {NextFunction, Request, Response} from 'express';
import passport from '../services/passport/passport-local'
import passportGoogle from '../services/passport/passport-google'
import {localAuth, protectedRoute, googleAuth} from '../controllers/user-controler'
const userRouter = express.Router();


userRouter.post('/login', passport.authenticate('login', {session: false}), localAuth)

userRouter.post('/signup', passport.authenticate('signup', {session: false}), localAuth)

userRouter.get("/google", 
    passportGoogle.authenticate('google', {scope: ["profile", "email"], session: false}));

userRouter.get('/google/callback',
    passportGoogle.authenticate('google', {session: false}),
    googleAuth
    );

userRouter.get('/restricted', passport.authenticate('jwt', {session: false}) , protectedRoute)

userRouter.get('/logout', (req: Request, res: Response)=>{
    req.logOut()
    res.clearCookie('msfToken') // TODO change logic
    res.send('User is loged out')
})
  
export default userRouter;

