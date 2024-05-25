import bcrypt from 'bcrypt'
import User from '../models/user.models.js'

const SignUp = async (req, res, next) => {

    const { name, email, password } = req.body;

    const ExistingUser = await User.findOne({ email });

    if (!ExistingUser) {
        const HashPassword = await bcrypt.hash(password, 10);
        User.create({
            name,
            email,
            password: HashPassword
        }).then((user) => {
            req.session.user = user;
            res
                .status(200)
                .json({
                    message: "User created successfully"
                })
        })
    } else {
        res
            .status(409)
            .json({
                message: "User already exists"
            })
    }
}


const SignIn = (req, res, next) => {

}

const LogOut = (req, res, next) => {

}

export { SignUp, SignIn, LogOut }