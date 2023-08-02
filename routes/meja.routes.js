const express = require('express')

const app = express()

app.use(express.json())

const mejaController = require('../controller/meja.controller')
const  auth = require(`../controller/auth.controller`)

app.get("/",auth.authVerify,  mejaController.getAllMeja)

app.post("/",auth.authVerify, mejaController.addMeja)

app.post("/find",auth.authVerify, mejaController.findMeja)

app.put("/:id",auth.authVerify, mejaController.updateMeja)

app.delete("/:id",auth.authVerify, mejaController.deleteMeja)
module.exports = app