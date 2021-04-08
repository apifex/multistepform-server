import express, {NextFunction, Request, Response} from 'express';
import passport from '../services/passport/passport-local'
import passportGoogle from '../services/passport/passport-google'
import {localAuth, protectedRoute, googleAuth} from '../controllers/auth-controler'
import {deleteUser, getUserInfo} from '../controllers/user-controler'
const userRouter = express.Router();

userRouter.post('/login', passport.authenticate('login', {session: false}), localAuth)

userRouter.post('/signup', passport.authenticate('signup', {session: false}), localAuth)

userRouter.post('/delete', passport.authenticate('jwt', {session: false}), deleteUser)

userRouter.get('/getuserinfo', passport.authenticate('jwt', {session: false}), getUserInfo)

userRouter.get("/google", 
    passportGoogle.authenticate('google', {accessType: 'offline',
                                           prompt: 'consent',
                                           scope: ["profile", "email",
                                            "https://www.googleapis.com/auth/spreadsheets",
                                            "https://www.googleapis.com/auth/drive.file"], 
                                           session: false}));

userRouter.get('/google/callback',
    passportGoogle.authenticate('google', {session: false}),
    googleAuth
    );

userRouter.get('/restricted', passport.authenticate('jwt', {session: false}) , protectedRoute)


export default userRouter;

