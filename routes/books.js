const express = require("express")
const BooksController = require("../controller/books")
const router = express.Router()
const booksController = new BooksController()

router.get('/books', booksController.search)

module.exports = router