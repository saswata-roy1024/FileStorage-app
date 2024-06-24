import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from 'passport'
import connection from './src/config/database.js'
import FileRouter from './src/routes/File.routes.js'
import AuthRouter from './src/routes/Auth.routes.js'
import UserRouter from './src/routes/User.routes.js'
import cors from 'cors'
import cookieParser from "cookie-parser";

import dotenv from 'dotenv'
dotenv.config();



const PORT = process.env.PORT || 6000;

const app = express();

app.use(session({
    name: "session",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60000,
    },
    store: MongoStore.create({
        client: connection.getClient(),
    })
}));

app.use(cors({ credentials: true, origin: process.env.ORIGIN_URL, secure:false }));
app.use(express.json())
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser())

app.use("/api/auth", AuthRouter);
app.use("/api/files", FileRouter);
app.use("/api/u", UserRouter);




connection.once('open', () => {
    app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))
});

