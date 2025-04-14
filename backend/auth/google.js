import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import dotenv from "dotenv"
import User from "../model/User.js";

import { generateToken } from "../utils/token.js";

dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:4000/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name: profile.displayName,
        email: email,
      });
    }

    return done(null, user);

  } catch (err) {
    return done(err, null);
  }
}
));





