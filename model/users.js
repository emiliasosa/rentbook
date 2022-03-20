const {query, insert} = require("../config/database")

class User{
    constructor(firstName, lastName, username, email, birthday, profilePic, password){
        this.firstName = firstName,
        this.lastName = lastName,
        this.username = username,
        this.email = email,
        this.birthday = birthday,
        this.profilePic = profilePic
        this.password = password
        //no se pide aca el id, se solicita en save
        //this.idUser = idUser
    }

    //se pone estatico para no intanciar en otro lado y no generar "nuevos usuarios" y tenerlo disponible sin instanciar, para que no se edite ningun elemento
    static async readAll(){
        //como se devuelven todos, va asi
        return await query("SELECT * FROM users")
    }

    //guarda una instancia de usuario
    async save(){
        const newUser = await insert("users", this)
        //cuando se guarda devuelve el id, se toma el id y se lo asigna al usuario, cuando se crea el usuario no sabemos el id, aca lo conocemos
        this.idUser = newUser.id
    }

    //actualizar el usuario con las nuevas propiedades
    async update(newuser){
        //this hace referencia a todo lo que tiene el objeto, se actualiza en la misma clase
        const id = await query("UPDATE users SET ? WHERE idUser ?", [this, this.idUser])

    }

    async delete(){
        await query("DELETE FROM users WHERE idUser = ?", [this.idUser])
    }
    
}

module.exports = User