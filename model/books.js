const {query} = require("../config/database")

class Book{
    static async search(searchParam){
        return await query(`SELECT * FROM books WHERE title LIKE '${searchParam}%' OR author LIKE '${searchParam}%'`) //, [searchParam, searchParam])
    }
}

module.exports = Book