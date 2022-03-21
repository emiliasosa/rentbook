const {query, insert} = require("../config/database")

class Books{
    idBook
    constructor(title, description, author, picture, publication,category, stock, language){
        this.title = title
        this.description = description
        this.author = author
        this.picture = picture
        this.publication = publication
        this.category = category
        this.stock = stock
        this.language = language
    }

    //se pone estatico para no intanciar en otro lado y no generar "nuevos usuarios" y tenerlo disponible sin instanciar, para que no se edite ningun elemento
    static async readAll(){
        //como se devuelven todos, va asi
        return await query("SELECT * FROM books")
    }

    //guarda una instancia de usuario
    async save(){
        //si se pasa this, se va a pasar todos los metodos
        //const newUser = await insert("users", this)
        const newBook = await insert("books",{
            //se crea un objeto para obtener especificamente lo que necesitamos
            title: this.title,
            description: this.description,
            author: this.author,
            picture: this.picture,
            publication: this.publication,
            category: this.category,
            stock: this.stock,
            language: this.language 
        })
        //cuando se guarda devuelve el id, se toma el id y se lo asigna al usuario, cuando se crea el usuario no sabemos el id, aca lo conocemos
        this.idBook = newBook.id

        return newBook
    }

    //actualizar el usuario con las nuevas propiedades
    async update(newbook){
        //this hace referencia a todo lo que tiene el objeto, se actualiza en la misma clase
        const id = await query("UPDATE books SET ? WHERE idBooks ?", [this, this.idBook])

    }

    async delete(){
        await query("DELETE FROM books WHERE idBooks = ?", [this.idBook])
    }

    validate(){
        //se realiza una comparacion para validar
        let result = {success:true, errors:[]}

        //validar que todos los campos esten llenos, ! lo hace false
        if(!(this.title && this.author && this.description && this.stock && this.language && this.publication && this.picture && this.category)){
            result.success = false
            result.errors.push("Complete all fields.")
        }

        //se devuelve si es exitoso o no
        return result
    }
    
}

module.exports = Books