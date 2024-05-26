
const SignUp = async (req, res) => {

    res
        .status(200)
        .json({
            user: req.session.passport.user,
            message: "User created successfully"
        })
}


const SignIn = (req, res) => {
    res
        .status(200)
        .json({
            user: req.session.passport.user,
            message: "User logged In successfully"
        })
}

const LogOut = (req, res, next) => {

}

export { SignUp, SignIn, LogOut }