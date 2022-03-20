const User = require("../model/users")
const userModel = new User()

class UserController{
    async getUsersView(req, res){
        //al hacerlo estatico, ya no se puede usar userModel.readAll, sino que se usa User.readAll
        const data = await User.readAll()
        return res.render("home", {
            username:"holi", 
            users: data,
            hasUsers: data.length > 0
            }
        )
    }
}

module.exports = UserController
