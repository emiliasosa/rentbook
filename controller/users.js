const Books = require("../model/book")
const User = require("../model/users")
const userModel = new User()

class UserController{
    async getUsersView(req, res){
        //al hacerlo estatico, ya no se puede usar userModel.readAll, sino que se usa User.readAll
        const data = await User.readAll()
        
        //ya no hace falta esta parte porque paso por el session del middleware
        /*if(req.session.loggedIn){
            return res.render("home", {
                users: data,
                hasUsers: data.length > 0,
                username:req.session.username,
                picture:req.session.picture,
                loggedIn:true
                }
            )
        }*/
        return res.render("home", /*{
            //yo no estoy pasando esto por el home, solo lo use para que el home se muestre
            //users: data,
            //hasUsers: data.length > 0,
            }*/
        )
    }
}

module.exports = UserController
