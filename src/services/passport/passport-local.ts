import passport from 'passport';
import { Strategy } from 'passport-local'
import UserModel from '../../models/user-model'

const authFields = {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true as true
  };

passport.use("login", 
  new Strategy(
      authFields, async (req, email, password, done) => {
        try {
          const user = await UserModel.findOne({email: email})
          if (!user || !user.validatePassword(password)) {
            return done(null, false, { message: "Invalid email or password"})
          }
          return done(null, user)          
        } catch (error) {
          return done(error)
        }
      }
  ) 
)

passport.use("signup",
  new Strategy(
      authFields, async (req, email, password, done) => {
        try{
          const checkEmail = await UserModel.checkExistingField('email', email);
          if (checkEmail) {
            throw new Error('Email already registered, log in instead')
          }

          const checkUserName = await UserModel.checkExistingField('userName', req.body.userName);
          if (checkUserName) {
            throw new Error('Username exists, please try another')
          }

          const newUser = await UserModel
            .build(
              { userName: req.body.userName, 
                email: email, 
                hash: password}
            )
            .save();
            return done(null, newUser);
          } catch (err) {
            return done(err, false, {message: err.message});
          }
        }
  )
)

export default passport