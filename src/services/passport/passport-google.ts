import { config } from "dotenv";
import passport from "passport";
import {Strategy} from "passport-google-oauth20";
import UserModel from '../../models/user-model'

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

config();

passport.use(
  new Strategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/api/user/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const currentUser = await UserModel.findOne({ googleId: profile.id });
        if (currentUser) {
          return done(null, currentUser, { statusCode: 200 });
        }
        
        if (!profile.emails) return
        const email = profile.emails[0].value;
        const userName = profile.emails[0].value;

        const checkEmail = await UserModel.checkExistingField("email", email);
        if (checkEmail) {
          const user = await UserModel.findByIdAndUpdate(
            checkEmail._id,
            { googleId: profile.id },
            { new: true }
          );
          if (user) return done(null, user, { statusCode: 200 });
        }

        const userObj = new UserModel({
          googleId: profile.id,
          userName,
          email,
        });

        const user = await userObj.save({ validateBeforeSave: false });
        return done(null, user, { statusCode: 201 });
      } catch (err) {
        
        done(err, false);
      }
    }
  )
);

export default passport;