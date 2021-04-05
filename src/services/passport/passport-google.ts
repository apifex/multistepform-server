import { config } from 'dotenv'
import passport, { Profile } from "passport";
import { GoogleCallbackParameters, Strategy } from "passport-google-oauth20";
import UserModel from '../../models/user-model'
import { VerifyCallback } from 'passport-google-oauth2';

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = process.env;

config();

passport.use(
  new Strategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      scope: ["profile", "email",
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive.file"],
    },
    async (accessToken: string, 
           refreshToken: string, 
           params: GoogleCallbackParameters, 
           profile: Profile, 
           done: VerifyCallback) => {
      try {
        const currentUser = await UserModel.findOne({ googleId: profile.id });
        if (currentUser) {
          return done(null, currentUser);
        }
        
        if (!profile.emails) return
        const email = profile.emails[0].value;

        const checkEmail = await UserModel.checkExistingField("email", email);
        if (checkEmail) {
          const user = await UserModel.findByIdAndUpdate(
            checkEmail._id,
            { googleId: profile.id },
            { new: true }
          );
          if (user) return done(null, user);
        }

        const userObj = new UserModel({
          googleId: profile.id,
          email,
          tokens: {
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_in: params.expires_in
          }          
        });

        const user = await userObj.save({ validateBeforeSave: false });
        return done(null, user);
      } catch (err) {
        done(err, err);
      }
    }
  )
);

export default passport;