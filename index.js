const express = require('express');
const app = express();
const mongoose = require('mongoose');
const EmpolyessRouter = require('./router/employess');
const BooksRouter = require('./router/Book');
const Register = require('./router/auth/register');
const Login = require('./router/auth/auth');
const logger = require("./config/logger");
const compression = require("compression");
const dotenv = require("dotenv");
dotenv.config();



app.use(express.json());
app.use(compression())
app.use("/api" , EmpolyessRouter);
app.use("/api/books" , BooksRouter);
app.use("/api/author/register" , Register);
app.use("/api/author/login" , Login);
app.all("*" , (req , res , next) => {
    res.status(404).json({
        status : "false",
        message : "The Page Not Found"
    })
})


mongoose.connect(process.env.URL2)
.then(() => {
    console.log(`
    ###########################Conectes###########################
    `)
}).catch((error) => {
    logger.error(`Check Your DataBase The Error Is : ${error}`);
    // console.log(error)
})




app.listen(process.env.PORT , () => {
    logger.info(`Server Is Working on Port 3000....`)
})