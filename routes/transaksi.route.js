const express = require(`express`)
const app = express()

app.use(express.json())

// call transaksiController
let transaksiController = require("../controller/transaksi.controller")
const  auth = require(`../controller/auth.controller`)

// endpoint get data transaksi
app.get("/", auth.authVerify,transaksiController.getAlltransaksi)
app.get("/:id", auth.authVerify,transaksiController.getTransaksiById)
app.post("/", auth.authVerify,transaksiController.addtransaksi)
app.post("/find",transaksiController.findTransaksi)
app.put("/:id", auth.authVerify,transaksiController.updatetransaksi)
app.delete("/:id", auth.authVerify,transaksiController.deletetransaksi)


module.exports = app