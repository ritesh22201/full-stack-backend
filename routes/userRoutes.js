const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const validator = require('../middlewares/validator');
const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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

userRouter.post('/login', async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if(!user){
            res.status(400).send({msg : "User doesn't exists!"});
        }
        else{
            const verifyPass = await bcrypt.compare(password, user.password);
            if(!verifyPass){
                res.status(400).send({msg : "Invalid password!"})
            }
            else{
                const token = jwt.sign({userId : user._id}, process.env.secretKey, {expiresIn : '10h'});
                res.status(200).send({msg : 'User loggedIn successfully', token});
            }
        }
    } catch (error) {
        res.status(400).send({msg : error.message});
    }
})

module.exports = userRouter;