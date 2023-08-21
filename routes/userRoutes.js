const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const validator = require('../middlewares/validator');
const UserModel = require('../models/userModel');

userRouter.post('/signup', validator, async(req, res) => {
    const {password, confirmPassword} = req.body;
    try {
        const newPass = await bcrypt.hash(password, 10);
        const newPass2 = await bcrypt.hash(confirmPassword, 10);

        const user = await UserModel.create({...req.body, password : newPass, confirmPassword : newPass2});
        res.status(200).send({msg : 'User registered successfully', user});
    } catch (error) {
        res.status(400).send({msg : error.message});
    }
})

module.exports = userRouter;