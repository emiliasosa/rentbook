const Books = require("../model/books")

class BooksController{
    async search(req, res){
        const data = await Books.search(req.query.search)
        return res.render("home", {searchResults: data})
    }
}

module.exports = BooksController