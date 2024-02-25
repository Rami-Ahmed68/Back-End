const mongoose = require("mongoose");
const Joi = require('joi');
const jwt = require("jsonwebtoken");

const user = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        min : 3,
        max : 44
    },
    age : {
        type : Number,
        required : true,
        min : 18,
        max : 50
    },
    email : {
        type : String,
        requierd : true,
        unique : true,
        min : 3,
        max : 255
    },
    password : {
        type : String,
        requierd : true,
        min : 8,
        max : 1024
    },
    isAdmin : Boolean
});

// function authorvalidate (auth) {
//     const Schema = Joi.object().keys({
//         name : Joi.string().min(3).max(44).required(),
//         age : Joi.number().min(18).max(50).required(),
//         email : Joi.string().min(3).max(255).required().email(),
//         password : Joi.string().min(8).max().required()
//     });
//     return Joi.ValidationError(auth);
// }


user.methods.generateTokens = function () {
    const token = jwt.sign({_id : this._id , isAdmin : this.isAdmin} , "privatekey");
    return token;
}

// module.exports = authorvalidate;
const User = mongoose.model("user" , user);
module.exports = User; 