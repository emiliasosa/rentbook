//llamar al modelo del usuario porque es el que tiene al usuario, asi se lo consulta, tiene toda la funcionalidad
const User = require("../model/users")

class AuthController{
    getLoginView(req, res){
        return res.render("login")
    }

    getSignUpView(req,res){
        return res.render("signup")
    }

    //ruta post para hacer el registro
    signUp(req,res){
        //peticion al body, para extraer la informacion
        //req.body
        //generar un nuevo usuario, toma lo que saca del body para mandarlo al modelo de usuarios
        const newUser = new User(req.body)
        console.log(newUser)
        return res.redirect("/")
    }
}

module.exports = AuthController