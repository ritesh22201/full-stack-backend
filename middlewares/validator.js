const UserModel = require("../models/userModel");

const validator = async (req, res, next) => {
    const { email, password, confirmPassword } = req.body;

    if (password.length < 8) {
        return res.status(400).send({ msg: 'Password must be of at least of 8 characters' });
    }

    if (password !== confirmPassword) {
        return res.status(400).send({ msg: 'Password and confirm password must be equal' });
    }

    if (!/\d/.test(password)) {
        return res.status(400).send({ msg: 'Password must contain a number' });
    }

    if (!/[A-Z]/.test(password)) {
        return res.status(400).send({ msg: 'Password must contain an uppercase character' });
    }

    if (!/[!@#$%&]/.test(password)) {
        return res.status(400).send({ msg: 'Password must contain a special character' });
    }

    const existedUser = await UserModel.findOne({ email });
    if (existedUser) {
        return res.status(400).send({ msg: 'User already exists, please login' });
    }

    next();
}

module.exports = validator;