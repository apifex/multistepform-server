import { config } from 'dotenv';
import {Request} from 'express';
import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import UserModel from '../../models/user-model'

config()

const jwtPublicSecret = process.env.JWT_PUBLIC_SECRET.replace(/\\n/g, "\n")

const cookieExtractor = (req: Request)  => {
  let token = null;
  if (req && req.cookies.msfToken) {
    token = req.cookies.msfToken;
  }
  return token;
};

const options = {
  secretOrKey: jwtPublicSecret,
  algorithms: ['RS256'],
  passReqToCallback: true,
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
    req => cookieExtractor(req),
  ])
};

passport.use(
  new Strategy (options, async (req: Request, jwtPayload: any, done: any) => {
    try{
      console.log('options', options)
      console.log('request', req)
      console.log('payload', jwtPayload)
      const user =  await UserModel.findOne({ _id: jwtPayload._id })
      user?done(null, user):done(null, false)
    }catch(err) {
      done(err, false)
    }
  }),
);

export default passport;