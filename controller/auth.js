
const { redirect } = require("express/lib/response")
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
    async signUp(req,res){
        //peticion al body, para extraer la informacion
        //req.body
        //generar un nuevo usuario, toma lo que saca del body para mandarlo al modelo de usuarios
        const newUser = new User(req.body.username, req.body.birthday,req.body.picture, req.body.email, req.body.password, req.body.repeatPassword)
        //validar el usuario
        const validation = newUser.validate()
        //si la validacion fue exitosa, enviar al home
        if(validation.success){
            const userSaved = await newUser.save()
            //preguntamos si la validacion fue exitosa
            if(userSaved.success){
                return res.redirect("/")
            }else{
                validation.errors = [userSaved.error]
                validation.success = false
                //no se puede realizar de esta manera porque es const
                //validation = {sucess:true, erorrs:}
            }  
        }
        //si no se valido, quede en el signup, newUser es para pasar los datos que ya coloco el usuario en el formulario de registro
        return res.render("signup", {validation, user:newUser})    
    }

    async logIn(req, res){
        const credenciales = req.body
        const userData = await User.getByEmail(credenciales.email)
        
        //validar que el email exita en la bd
        if(userData.length === 0){
            return res.render("login", {validation:{
                errors:["This user doesn't exist."]}
            })
        }
        //validar contrasenia
        if(userData[0].password!==credenciales.password){
            return res.render("login", {validation:{
                errors:["Wrong password."]}
            })
        }
        //cookies
        //return res.setHeader("Set-Cookie", "loggedIn=true").redirect("/")

        //express session guarda la sesion en el servidor, no puede ser leida desde el navegador, es solo un identificador
        req.session.loggedIn = true
        req.session.username = userData[0].username
        req.session.picture = userData[0].picture
        req.session.idUser = userData[0].id
        //si esta todo ok, te envia a la pagina principal
        return res.redirect("/")
    }

    logOut(req, res){
        //destroy es para limpiar la sesion del usuario
        req.session.destroy()
        return res.redirect("/")
    }
}

module.exports = AuthController