const express = require("express")
const BookController = require("../controller/book")
const router = express.Router()
const bookController = new BookController()

router.get("/newbook", bookController.getNewBookView)
router.post("/newbook", bookController.bookUp)

router.get("/rentbook", bookController.getBookView)
router.post("/rentbook", bookController.returnBook)

module.exports = router