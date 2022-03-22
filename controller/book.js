const { redirect } = require("express/lib/response")
const Books = require("../model/book")

class BookController{
    //ver formulario para crear libros, en rutas es get
    getNewBookView(req, res){
        return res.render("newbook")
    }

    //ruta post para hacer el registro
    async bookUp(req,res){
        //peticion al body, para extraer la informacion
        //req.body
        //generar un nuevo libro, toma lo que saca del body para mandarlo al modelo de libros
        const newBook = new Books(req.body.title, req.body.description, req.body.author, req.body.picture, req.body.publication, req.body.category, req.body.stock, req.body.language )
        //validar el libro
        const validation = newBook.validate()

        //si la validacion fue exitosa, enviar al home
        if(validation.success){
            const bookSaved = await newBook.save()
            //preguntamos si la validacion fue exitosa
            if(bookSaved.success){
                await Books.publishMyBooks(bookSaved.id, req.session.idUser)
                return res.redirect("/")
            }else{
                validation.errors = [bookSaved.error]
                validation.success = false
            } 
        } 

        //si no se valido, quede en el signup, newBook es para pasar los datos que ya coloco el libro en el formulario de registro
        return res.render("newbook", {validation, book:newBook})
        
    }

    async getBookView(req, res){
        let search = req.query.search
        let data;
        if (search){
            data = await Books.search(search)
            //ordernar segun ranking de mayor a menos
            //data[9].sort((a,b) => {if(a < b){return -1}})
        } else {
            data = await Books.readAll()
        }
        return res.render("books", {
            books: data,
            hasBooks: data.length > 0})
    }

    async getRentBookView(req, res){
        let data = await Books.readRentedBook(req.session.idUser)
        return res.render("rentbook", {
            rentbook: data,
            hasRentBooks: data.length > 0})
    }

    async rentBook(req,res){
         //pido por parametro el id del libro
         const idBook = req.params.idBook
         //envio los id al metodo mybook
         await Books.rentBooks(idBook, req.session.idUser)
         //redirijo a mis libros
         res.redirect("/rentbook")
    }

    async returnBooks(req, res){
        //pido por parametro el id del libro
        const idBook = req.params.idBook
        //envio los id al metodo mybook
        await Books.returnRentBook(idBook)
        //redirijo a mis libros
        res.redirect("/rentbook")
    }

    async getMyBookView(req, res){
        let data = await Books.readMyBook(req.session.idUser)
        
        return res.render("mybooks", {
            mybook: data,
            hasMyBooks: data.length > 0})
    }

    async editingMyBook(req,res){
        return res.redirect("editbook")
    }

    async getMyEditView(req,res){

    }

    async deleteMyBook(req, res){
        //pido por parametro el id del libro
        const idBook = req.params.idBook
        //envio los id al metodo mybook
        await Books.delete(idBook)
        //redirijo a mis libros
        res.redirect("/mybooks")
    }
}

module.exports = BookController