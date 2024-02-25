const express = require("express");
const mongoose = require("mongoose");

const employee = new mongoose.Schema({
    fullname : {
        type : String,
        required : true,
        max : 20,
        min : 5
    },
    salary : {
        type : Number,
        max : 3000,
        min : 300,
        required : true,
    },
    work : {
        type : Boolean,
        required : true,
        default : true
    }
})

const Employee = mongoose.model("employee" , employee)

module.exports = Employee;