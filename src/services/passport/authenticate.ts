import {NextFunction, Request, Response} from 'express';
import passportJWT from './passport';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    passportJWT.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      
      if (!user) {
        throw new Error('invalid token, please log in or sign up');
      }
      req.user = user;
      return next();
    })(req, res, next);
  }