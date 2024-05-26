import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport'
import bcrypt from 'bcrypt'
import User from '../models/user.models.js'

passport.use('local-signup', new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true }, async (req, email, password, done) => {
        const { name } = req.body;
        try {

            if (await User.findOne({ email })) throw new Error('Email already exists.')

            User.create({
                name,
                email,
                password: await bcrypt.hash(password, 10),
            })
                .then((user) => { return done(null, user) })
                .catch((error) => {
                    console.log(error);
                    throw new Error('Database Error: Cannot save User!')
                })

        } catch (error) {
            done(error)
        }
    }
));

passport.use('local-signin', new LocalStrategy(
    { usernameField: 'email' }, async (email, password, done) => {
        try {

            const user = await User.findOne({ email });
            if (!user) throw new Error('Invalid Email');

            if (!(bcrypt.compareSync(password, user.password))) throw new Error('Invalid Credentials');
            return done(null, user);

        } catch (error) {
            done(error)
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