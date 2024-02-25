const express = require("express");
const mongoose = require("mongoose");

const Author = require("./auth/register");

const book = new mongoose.Schema({
    title : {
        type :String,
        requierd : true,
        max : 20,
        min : 3,
    },
    Date : {
        type : Date,
        default : new Date()
    },
    pages_number : {
        type : Number,
        max : 500,
        min : 50,
        requierd : true
    },
    author : 
    {
        type : mongoose.Schema.Types.ObjectId,
        requierd : true,
        ref : "Author"
    }
});

const Book = mongoose.model("book" , book);

module.exports = Book;

