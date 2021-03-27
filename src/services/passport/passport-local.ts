import passport from 'passport'
import { Strategy } from 'passport-local'
import UserModel from '../../models/user-model'

const authFields = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true as true,
  };

  passport.use(
    'login',
    new Strategy(authFields, async (req, email, password, cb) => {
      try {
        const user = await UserModel.findOne({
          $or: [{ email }, { userName: email }],
        });
  
        if (!user || !user.password) {
          return cb(null, false, { message: 'Incorrect email or password.' });
        }
  
        const checkPassword = await user.comparePassword(password);
  
        if (!checkPassword) {
          return cb(null, false, { message: 'Incorrect email or password.' });
        }

        return cb(null, user, { message: 'Logged In Successfully' });
      } catch (err) {
        return cb(null, false, { message: err.message});
      }
    }),
  );

  
  passport.use(
    'signup',
    new Strategy(authFields, async (req, email, password, cb) => {
      try {
      const checkEmail = await UserModel.checkExistingField('email', email);
  
        if (checkEmail) {
          return cb(null, false, {
            message: 'Email already registered, log in instead',
          });
        }
  
      const checkUserName = await UserModel.checkExistingField('userName', req.body.userName);
        if (checkUserName) {
          return cb(null, false, {
            message: 'Username exists, please try another',
          });
        }
  
      const newUser = await UserModel
        .build(
          { userName: req.body.userName, 
            email: req.body.email, 
            password: req.body.password}
        )
        .save();
        return cb(null, newUser);
      } catch (err) {
        return cb(null, false, {message: err.message});
      }
    }),
  );

  export default passport;