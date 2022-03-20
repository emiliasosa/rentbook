const express = require("express")
const UserController = require("../controller/users")

const router = express.Router()

const userController = new UserController()


router.get("/", userController.getUsersView)

//estar adentro del scoope
//router.get("/", (req, res) => {userController.readAll(req,res)})

module.exports = router