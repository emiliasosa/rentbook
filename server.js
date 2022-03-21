const express =require("express")
const {port, secret} = require("./config")
const path = require("path")

const {engine} = require("express-handlebars")
const { DateTime } = require("luxon")

//importar rutas
const userRouter = require("./routes/users")
const authRouter = require("./routes/auth")
const bookRouter = require("./routes/book")
const session = require("express-session")
const addSessionToTemplate = require("./middleware/addSessionToTemplate")

const app = express()

//definir carpeta de archivos estaticos
app.use(express.static(path.join(__dirname, 'static')))

//middleware transforma el formato del formulario a objecto de js
app.use(express.urlencoded({extended:true}))

//middleware para validar la sesion que tienen los usuarios, si queremos que la sesion sea secreta se pone secret:"", va en las variables de entorno
app.use(session({
    //secret define que solo yo tenga acceso a esa informacion, mas seguridad
    secret:secret,
    //resave guarda la sesion cada vez que se hace una peticion, se pone false para que no lo haga, sino causa problemas de rendimiento, que solamente se guarde si algo cambia
    resave:false,
    //save guarda lo que sea inicializado, va de la mano con resave, si no se inicializo una sesion, no se guarde nada
    saveUninitialized:false
}))

//hay que poner este middleware despues de la sesion, sino no tendria disponible los datos de la sesion, si se pone ()al final, hay que pasarle una funcion
app.use(addSessionToTemplate)

app.engine('hbs', engine ({
    //acepta la extension hbs
    extname: "hbs",
    //para que no vaya al layout creado en views como defecto, se pone defaultlayout "", layoutdir dice la ubicacion de los layout
    //se agrega el css en el main.hbs
    //defaultLayout:"",
    //para usar el componente como partials, hay que cambiar la direccion desde donde lo toma
    partialsDir: path.join(__dirname, "views", "components"),
    helpers:{
        formatDate: (date)=>{
            const newDate = new DateTime(date)
            return newDate.toLocaleString()
        }
    }
}))

app.set("view engine",'hbs')
app.set("views","views")

//usa lo que estamos haciendo
app.use(userRouter)
app.use(authRouter)
app.use(bookRouter)


app.listen(port, ()=>{
    console.log("Funcionando... http://localhost:"+port )

})