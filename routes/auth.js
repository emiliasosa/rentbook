//se ponen todas las rutas para la app relacionadas con la autenticacion, iniciar sesion, usuario, contrasenia, etc
const express = require("express")
//importa el authcontroller
const AuthController = require("../controller/auth")

const router = express.Router()
const authcontroller = new AuthController()

//se coloca formcss true, para que use el estilo css especifico de form
//router.get("/login", (req, res) => {return res.render("login", {formCSS: true})})

//referencia a la funcion, sin ()
router.get("/login", authcontroller.getLoginView)
router.get("/signup", authcontroller.getSignUpView)
//donde se envia el formulario
router.post("/signup", authcontroller.signUp)

module.exports = router