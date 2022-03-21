const {query, insert} = require("../config/database")

class User{
    idUser
    constructor(username, birthday, picture, email, password,repeatPassword){
        this.username = username
        this.birthday = birthday
        this.picture = picture
        this.email = email
        this.password = password
        this.repeatPassword = repeatPassword
        //no se pide aca el id, se solicita en save
        //this.idUser = idUser
    }

    //se pone estatico para no intanciar en otro lado y no generar "nuevos usuarios" y tenerlo disponible sin instanciar, para que no se edite ningun elemento
    static async readAll(){
        //como se devuelven todos, va asi
        return await query("SELECT * FROM usersp2")
    }

    //guarda una instancia de usuario
    async save(){
        //si se pasa this, se va a pasar todos los metodos
        //const newUser = await insert("users", this)
        const newUser = await insert("usersp2",{
            //se crea un objeto para obtener especificamente lo que necesitamos
            username: this.username,
            birthday: this.birthday,
            email: this.email,
            picture: this.picture,
            password: this.password 
        })
        //cuando se guarda devuelve el id, se toma el id y se lo asigna al usuario, cuando se crea el usuario no sabemos el id, aca lo conocemos
        this.idUser = newUser.id
        //regresar la respuesta de la bd
        return newUser

    }

    //actualizar el usuario con las nuevas propiedades
    async update(newuser){
        //this hace referencia a todo lo que tiene el objeto, se actualiza en la misma clase
        const id = await query("UPDATE users SET ? WHERE idUser ?", [this, this.idUser])

    }

    async delete(){
        await query("DELETE FROM users WHERE idUser = ?", [this.idUser])
    }

    validate(){
        //se realiza una comparacion para validar
        let result = {success:true, errors:[]}

        //validar que todos los campos esten llenos, ! lo hace false
        if(!(this.password && this.username && this.birthday && this.email && this.repeatPassword)){
            result.success = false
            result.errors.push("Complete all the fields.")
        }

        //validar que la contrasenia y la contrasenia repetida coincidan
        if(this.password != this.repeatPassword){
            result.success = false
            result.errors.push("Password doesn't match.")
        }

        //se devuelve si es exitoso o no
        return result
    }

    //seleccionar el email para poder verificar el login
    static async getByEmail(email){
        return await query("SELECT * FROM usersp2 WHERE email=?", [email])
    }
    
}

module.exports = User