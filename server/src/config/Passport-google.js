import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import User from '../models/user.models.js'

passport.use('google', new GoogleStrategy(
    {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "https://filestorage-xq97.onrender.com/api/auth/google/callback",
        scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        try {
            const user = await User.findOne({ email: profile._json.email })
            console.log(user);
            if (user) {
                return done(null, user)
            }

            User.create({
                name: profile._json.name,
                email: profile._json.email,
                profilePic: profile._json.picture,
                verified: profile._json.email_verified,
                method: 'google',
            })
                .then((user) => { return done(null, user) })
                .catch((error) => {
                    console.log(error);
                    throw new Error('Database Error: Cannot save User!')
                })
        } catch (error) {
            done(error);
        }
    }
));


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = User.findOne(id);
    done(null, user);
});