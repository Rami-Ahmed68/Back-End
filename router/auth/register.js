const express = require('express');
const router = express.Router();
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');


const User = require("../../models/auth/register.js");

router.get("/" , (req , res) => {
    res.send("Hello This Is Creating User Page");
});

router.post("/Create" , async (req , res) => {
    const Schema = Joi.object().keys({
        name: Joi.string().min(3).max(44).required(),
        age: Joi.number().min(18).max(50).required(),
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(8).max(12).required() // Removed max() as it was missing a value
    });
    
    try {
        const validationResult = Schema.validate(req.body);

        if (validationResult.error) {
            return res.status(400).send(validationResult.error.details);
        }

        let user = await User.findOne({email : req.body.email});

        if (user) {
            res.status(404).send("User is already used")
        } else {
            const user = new User( _.pick(req.body , ['name' , 'age' , 'email' , 'password']));

            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds)
            user.password = await bcrypt.hash(user.password , salt);

        
            const result = await user.save();
            const token = user.generateTokens()
            res.send({
                "userInfo" : _.pick(result , ['name' , 'age' , 'email']),
                "token" : token
            });
        }

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal server error ...........' + error);
    }
});



module.exports = router;