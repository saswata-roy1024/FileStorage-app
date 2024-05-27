
const SignUp = async (req, res) => {
    res.status(200)
        .json({
            user: req.session.passport.user,
            message: "User created successfully"
        })
}


const SignIn = (req, res) => {
    res.status(200)
        .json({
            user: req.session.passport.user,
            message: "User logged In successfully"
        })
}


const GoogleCallback = (req, res) => {
    res.status(200).redirect('http://localhost:5000/auth/callback');
}

const Failure = (req, res) => {
    res.status(500).json({ error: 'something went wrong' })
}


const IsAuthenticated = (req, res) => {
    if (req.isAuthenticated()) res.status(200).send('Authenticated');
    else res.status(401).send('Unauthorized');
}


const LogOut = (req, res, next) => {

}

export { SignUp, SignIn, GoogleCallback, IsAuthenticated, Failure, LogOut }