const express = require('express');
const router = express.Router();


const Book = require('../models/book');

// Get All Books 
router.get("/allbooks" , async (req , res) => {
    // const books = await Book.find().populate('author' , '-_id').select('title -_id');
    const books = await Book.find().populate('author');
    res.send(books)
});

// Get Books By Id
// router.get("/ff/:id" , async (req , res) => {
//     const books = await Book.findById(req.params.id);
//     res.send(books)
// });

// Create New Book 
router.post("/Create" , async (req , res) => {
    if (!req.body.author) {
        return res.status(404).send("author Id Is Requierd ....");
    }

    const NewBook = new Book();
    NewBook.title = req.body.title;
    NewBook.pages_number = req.body.pages_number;
    NewBook.author = req.body.author;
    const result = await NewBook.save();
    res.send(result)
});

// Update book data
router.put("/Update/:id" , async (req , res) => {
    const book = await Book.findByIdAndUpdate(req.params.id , {
        title : req.body.title,
        pages_number : req.body.pages_number,
    } , { new : true});
    if (!book) {
        return res.status(404).send("Book No Found")
    }
    res.send(book)
});

// Remove one book 
// router.delete("/" , async (req , res) => {
//     const book = await Book.findByIdAndDelete(req.params.id) 
// })
module.exports = router;