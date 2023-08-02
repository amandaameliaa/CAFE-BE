const express = require(`express`)
const app = express()
app.use(express.json())
const userController = require(`../controller/user.controller`)
const  auth = require(`../controller/auth.controller`)

//endpoint
app.post("/login", userController.login)
app.get("/",auth.authVerify,userController.getAllUser)
app.post("/",userController.addUser)
app.put("/:id", auth.authVerify,userController.updateUser)
app.delete("/:id", auth.authVerify,userController.deleteUser);

module.exports = app