// const { request, response } = require("express")
// const detailtransaksiModel = require(`../models/index`).detail_transaksi
// // const transaksiModel = require(`../models/index`).transaksi
// // const userModel = require(`../models/index`).user
// // const mejaModel = require(`../models/index`).meja

// const Op = require(`sequelize`).Op
// const Sequelize = require("sequelize");
// const sequelize = new Sequelize("ukkkafe", "root", "", {
//   host: "localhost",
//   dialect: "mysql",
// });
// exports.getAlldetail = async (request, response) => {
//   let transaksi = await detailtransaksiModel.findAll();
//   return response.json({
//     success: true,
//     data: transaksi,
//     message: `ini adalah semua data user`,
//   })
// // }