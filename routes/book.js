const express = require("express")
const BookController = require("../controller/book")
const router = express.Router()
const bookController = new BookController()

router.get("/newbook", bookController.getNewBookView)
router.post("/newbook", bookController.bookUp)

router.get("/books", bookController.getBookView)
router.post("/books", bookController.bookUp)

router.get("/rentbook", bookController.getBookView)
router.get("/rentbook/:idBook", bookController.rentBook)

router.get("/mybooks", bookController.getMyBookView)
router.post("/mybooks", bookController.addMyBook)
router.post("/mybooks", bookController.deleteMyBook)

router.get("/score", bookController.score)

module.exports = router