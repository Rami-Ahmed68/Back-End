const mongoose = require("mongoose");


const UserLogin = new mongoose.Schema({
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
    }
});

const Login = mongoose.model("user" , UserLogin);
module.exports = Login;