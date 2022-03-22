const { redirect } = require("express/lib/response")
const Books = require("../model/book")

class BookController{
    async score(req, res){
        const score = req.query.score
        const idBook = req.query.idBook
        let results = await Books.puntuar(idBook, score)
        console.log(results)
    }

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
        console.log(newBook)
        const validation = newBook.validate()

        //si la validacion fue exitosa, enviar al home
        if(validation.success){
            const bookSaved = await newBook.save()
            //preguntamos si la validacion fue exitosa
            if(bookSaved.success){
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

    async rentBook(req,res){
         //pido por parametro el id del libro
         const idBook = req.params.idBook
         //envio los id al metodo mybook
         await Books.rentBooks(idBook, req.session.idUser)
         //redirijo a mis libros
         res.redirect("/rentbook")
    }

    returnBook(){
        
    }

    async getMyBookView(req, res){
        return res.render("mybooks")
    }

    async addMyBook(req,res){
       
    }

    async deleteMyBook(){

    }
}

module.exports = BookController