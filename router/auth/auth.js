const express = require('express');
require("express-async-errors");
const router = express.Router();
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");


// const Login = require("../../models/auth/login");
const User = require("../../models/auth/register");

router.get("/profile" , auth , async (req , res) => {
    const profile = await User.findById(req.user._id).select("-password");
    res.send(profile)
});

router.get("/users" , async (req , res) => {
    const users = await User.find().sort("name");
    res.send(users);
});

// pagination //
router.get("/pages" , async (req , res) => {
    const { page = 1 , limit = 10} = req.query;

    const users = await User.find()
    .sort("name")
    .limit(limit * 1)
    .skip((page - 1) * limit).exec();
    res.send(users);
})

router.post("/t" , auth , async (req , res) => {
    const Schema = Joi.object().keys({
        email : Joi.string().min(3).max(255).required().email(),
        password : Joi.string().min(8).max(12).required()
    });

    try {
        const validatebody = Schema.validate(req.body);
        if (validatebody.error) {
            return res.status(404).send(validatebody.error.details);
        }

        let user = await User.findOne({email : req.body.email});

        if (!user) {
            return res.status(404).send("User Not Found");
        }

        const pass = await bcrypt.compare(req.body.password , user.password);
        if (!pass) {
            res.status(404).send("Invalid Email or password");
        }
        
        const token = user.generateTokens()

        res.send({
            "userinf" : _.pick(user , ['name' , 'age' , 'email']),
            "token" : token
        })

    } catch (error) {
        console.error('Error creating user:', error);
        res.send("Erorrororororo")
    }
})

router.delete("/delete/:id" , [auth , admin] , async (req , res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return res.status(404).send("This User Not Found ...")
    };
    res.send(user)
})

module.exports = router;