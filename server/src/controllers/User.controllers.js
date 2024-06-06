import User from '../models/user.models.js'

const fetchUser = async (req, res) => {
    const _id = req.session.passport.user;
    console.log(_id);

    const user = await User.findOne({ _id });
    console.log(user)

    if (user) {
        res.status(200).json({
            name: user.name,
            email: user.email,
            profilePic: user.profilePic,
            verified: user.verified
        })
    } else {
        res.status(401).send('Unauthorized');
    }

}


export { fetchUser };