// import express from "express";
// import session from "express-session";
// import path from 'path';
// import MongoStore from "connect-mongo";
// import passport from 'passport'
// import connection from './src/config/database.js'
// import FileRouter from './src/routes/File.routes.js'
// import AuthRouter from './src/routes/Auth.routes.js'
// import UserRouter from './src/routes/User.routes.js'
// import cors from 'cors'
// import cookieParser from "cookie-parser";
// import dotenv from 'dotenv'
// dotenv.config();



// const PORT = process.env.PORT || 6000;
// const __dirname = path.resolve();
// const app = express();

// app.use(session({
//     name: "session",
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     rolling: true,
//     cookie: {
//         secure: false,
//         httpOnly: true,
//         sameSite: 'lax',
//         maxAge: 7 * 24 * 60 * 60000,
//     },
//     store: MongoStore.create({
//         client: connection.getClient(),
//     })
// }));

// app.use(cors({ credentials: true, origin: process.env.ORIGIN_URL, secure:false }));
// app.use(express.json())
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(cookieParser())

// app.use("/api/auth", AuthRouter);
// app.use("/api/files", FileRouter);
// app.use("/api/u", UserRouter);

// app.use(express.static(path.join(__dirname, "/client/dist")));
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
// });



// connection.once('open', () => {
//     app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))
// });

import express from "express";
import session from "express-session";
import path from 'path';
import MongoStore from "connect-mongo";
import passport from 'passport';
import connection from './src/config/database.js';
import FileRouter from './src/routes/File.routes.js';
import AuthRouter from './src/routes/Auth.routes.js';
import UserRouter from './src/routes/User.routes.js';
import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 6000;
const __dirname = path.resolve();
const app = express();

// Session configuration
app.use(session({
    name: "session",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Set secure to true in production
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // Corrected maxAge value
    },
    store: MongoStore.create({
        client: connection.getClient(),
    })
}));

// CORS configuration
app.use(cors({
    credentials: true,
    origin: process.env.ORIGIN_URL,
}));

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

// API Routes
app.use("/api/auth", AuthRouter);
app.use("/api/files", FileRouter);
app.use("/api/u", UserRouter);

// Serve static files
app.use(express.static(path.join(__dirname, "client", "dist")));

// Fallback to index.html for any unmatched routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

connection.once('open', () => {
    app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
});
