const express =require("express")
const {port} = require("./config")
const path = require("path")

const {engine} = require("express-handlebars")
const { DateTime } = require("luxon")

//importar rutas
const userRouter = require("./routes/users")
const authRouter = require("./routes/auth")

const app = express()

//definir carpeta de archivos estaticos
app.use(express.static(path.join(__dirname, 'static')))
//middleware transforma el formato del formulario a objecto de js
app.use(express.urlencoded({extended:true}))

app.engine('hbs', engine ({
    //para que no vaya al layout creado en views como defecto, se pone defaultlayout "", layoutdir dice la ubicacion de los layout
    //se agrega el css en el main.hbs
    //defaultLayout:"",
    //para usar el componente como partials, hay que cambiar la direccion desde donde lo toma
    //partialsDir: path.join(__dirname, "views", "components"),
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



app.listen(port, ()=>{
    console.log("Funcionando... http://localhost:"+port )

})