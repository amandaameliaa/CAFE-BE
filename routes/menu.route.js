const express = require(`express`)
const app = express()
app.use(express.json())
const menuController = require(`../controller/menu.controller`)
const  auth = require(`../controller/auth.controller`)

app.get("/",auth.authVerify, menuController.getAllMenu)
app.post("/",auth.authVerify, menuController.addMenu)
app.post("/find",auth.authVerify,  menuController.findMenu)
app.put("/:id",auth.authVerify, menuController.updateMenu)
app.delete("/:id",auth.authVerify, menuController.deleteMenu)

module.exports = app