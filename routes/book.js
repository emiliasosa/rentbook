const express = require("express")
const BookController = require("../controller/book")
const router = express.Router()
const bookController = new BookController()

router.get("/newbook", bookController.getNewBookView)
router.post("/newbook", bookController.bookUp)

router.get("/books", bookController.getBookView)
router.post("/books", bookController.bookUp)

router.get("/rentbook", bookController.getRentBookView)
router.get("/book/:idBook", bookController.rentBook)
router.get("/rentbook/:idBook", bookController.returnBooks)

router.get("/mybooks", bookController.getMyBookView)
router.get("/mybooks/:idBook", bookController.deleteMyBook)

//router.get("/editbook", bookController.getMyEditView)
//router.get("/editbook/:idBook", bookController.editingMyBook)

module.exports = router