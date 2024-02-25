const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');




const Employee = require("../models/employee");

// Get all Employees By Name
router.get("/t" , async (req, res) => {
    const user = await Employee.find().sort('name');
    res.send(user)
});

// Get Users By Work 
router.get("/dd" , async (req , res) => {
    const users = await Employee.find({work : true});
    res.send(users)
})

// Get Employee By Id
router.get("/employee/:id" , async (req , res) => {
    const user = await Employee.findById(req.params.id);
    res.send(user);
})



router.get("/user/:id" , async (req , res) => {
    const user = await Employee.findById(req.params.id);
    res.send(user)
})

router.post("/post" , async (req , res) => {
    const newEmployee = new Employee ();
    newEmployee.fullname = req.body.fullname,
    newEmployee.salary = req.body.salary,
    newEmployee.work = req.body.work
    await newEmployee.save();
    res.send(newEmployee)
})

router.put("/up/:id" , async (req , res) => {
    const user = await Employee.findByIdAndUpdate(req.params.id , {
        fullname : req.body.fullname,
        salary : req.body.salary,
        work : req.body.work
    } , {new : true});
    if (!user) {
        return res.status(404).send("User No Found")
    }
    res.send(user)
})

module.exports = router;