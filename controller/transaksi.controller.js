// const { request, response } = require("express")
const detailtransaksiModel = require(`../models/index`).detail_transaksi
const transaksiModel = require(`../models/index`).transaksi
const userModel = require(`../models/index`).user
const mejaModel = require(`../models/index`).meja
const detailModel = require(`../models/index`).detail_transaksi

const Op = require(`sequelize`).Op
const Sequelize = require("sequelize");
const sequelize = new Sequelize("cafe_ukl", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

exports.getAlltransaksi = async (request, response) => {
  let transaksi = await sequelize.query(`SELECT transaksi.id_transaksi, transaksi.nama_pelanggan, transaksi.tgl_transaksi, transaksi.status, detail_transaksi.harga, menu.nama_menu FROM transaksi JOIN detail_transaksi ON transaksi.id_transaksi = detail_transaksi.id_transaksi JOIN menu ON detail_transaksi.id_menu = menu.id_menu;`)
 
  return response.json({
    success: true,
    data: transaksi[0],
    message: `ini adalah semua data user`,
  })
}

exports.getTransaksiById = async (request, response) => {
    const transaksiId = request.params.id; // Assuming the transaction ID is passed as a route parameter
  
    try {
      let transaksi = await sequelize.query(
        `SELECT transaksi.id_transaksi, transaksi.nama_pelanggan, transaksi.id_meja, transaksi.id_user, transaksi.tgl_transaksi, transaksi.status, detail_transaksi.harga, menu.nama_menu
         FROM transaksi 
         JOIN detail_transaksi ON transaksi.id_transaksi = detail_transaksi.id_transaksi JOIN menu ON detail_transaksi.id_menu = menu.id_menu
         WHERE transaksi.id_transaksi = :transaksiId  `,
        {
          replacements: { transaksiId },
          type: sequelize.QueryTypes.SELECT,
        }
      );
  
      if (transaksi.length === 0) {
        return response.status(404).json({
          success: false,
          message: 'Transaction not found',
        });
      }
  
      return response.json({
        success: true,
        data: transaksi[0],
        message: 'Transaction retrieved successfully',
      });
    } catch (error) {
      console.error('Error retrieving transaction:', error);
      return response.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  };
  

exports.findTransaksi = async (request, response) => {

    let keyword = request.body.nama_pelanggan

    let cariNamaPelanggan = await sequelize.query(`SELECT t.id_transaksi, t.nama_pelanggan, t.tgl_transaksi, t.status, dt.harga, m.nama_menu FROM transaksi as t JOIN detail_transaksi as dt ON t.id_transaksi = dt.id_transaksi JOIN menu as m ON dt.id_menu = m.id_menu WHERE t.nama_pelanggan = '${keyword}';`)
    let cari = cariNamaPelanggan
    // console.log(String(cariNamaPelanggan) == ",")
    if(String(cariNamaPelanggan) == ",") {
      let cariNamaUser = await sequelize.query(`SELECT t.id_transaksi, t.nama_pelanggan, t.tgl_transaksi, t.status, dt.harga, m.nama_menu FROM USER as u join transaksi as t JOIN detail_transaksi as dt ON t.id_transaksi = dt.id_transaksi JOIN menu as m ON dt.id_menu = m.id_menu WHERE u.nama_user = '${keyword}';`)
      cari = cariNamaUser
      if(String(cariNamaUser) == ",") {
        let cariTglTransaksi = await sequelize.query(`SELECT t.id_transaksi, t.nama_pelanggan, t.tgl_transaksi, t.status, dt.harga, m.nama_menu FROM transaksi as t JOIN detail_transaksi as dt ON t.id_transaksi = dt.id_transaksi JOIN menu as m ON dt.id_menu = m.id_menu WHERE t.tgl_transaksi like '${keyword}%';`)
      cari = cariTglTransaksi
      }
    }

    // let nama_pelanggan = await transaksiModel.findAll({
    //     where: {
    //         [Op.or]: [
    //             { nama_pelanggan: { [Op.substring]: keyword } }
    //         ]
    //     }
    // })

    return response.json({
        success: true,
        data: cari[0],
        message: `All transaksi have been loaded` 
    })
}
exports.addtransaksi = async(request, response) => {
  let newTransaksi = {
      tgl_transaksi: new Date(),
      id_user: request.body.id_user,
      id_meja: request.body.id_meja,
      nama_pelanggan: request.body.nama_pelanggan,
      status: `belum_bayar`,
      detail_transaksi:[
          {id_menu: request.body.id_menu},
          {harga: request.body.harga},
      ],
  };

  // update status meja
  await mejaModel.update({status: false}, {where:{id_meja:request.body.id_meja}});

  // insert ke tabel 
  transaksiModel
  .create(newTransaksi)
  .then(async (result) => {
      let detail_transaksi =request.body.detail_transaksi
      // asumsinya detail_transaksi itu bertipe array
      let id = result.id_transaksi
      for (let i = 0; i < detail_transaksi.length; i++) {
          detail_transaksi[i].id_transaksi = id;
      }

      // insert ke tabel detail_transaksi
      await detailtransaksiModel
      .bulkCreate(detail_transaksi)
      // create = insert 1 baris / 1 data
      // bulkCreate = bisa banyak data(array)
      .then(result => {
          return response.json({
              message:`Data transaksi berhasil ditambahkan`
          });
      })
      .catch(error => {
          return response.json({
              message: error.message
          });
      });
  })
  .catch(error => {
      return response.json({
          message: error.message
      });
  });
};

exports.updatetransaksi = async (request, response) => {

  let idTransaksi = request.params.id
  let transaksi = {
    tgl_transaksi: Date(),
    id_user: request.body.id_user,
    id_meja: request.body.id_meja,
    nama_pelanggan: request.body.nama_pelanggan,
    status: request.body.status
  }
  transaksiModel.update(transaksi, { where: { id_transaksi: idTransaksi } })
      .then(result => {
          return response.json({
              success: true,
              message: `Data terupdate`,
              data: result
          })
      })
      .catch(error => {
          return response.json({
              success: false,
              message: error.message,
          })
      })
}


exports.deletetransaksi = async (request, response) => {
  let idtransaksi = request.params.id

  transaksiModel.destroy({ where: { id_transaksi: idtransaksi } })
      .then(result => {
          return response.json({
              success: true,
              message: `Data tipe transaksi has been deleted`
          })
      })
      .catch(error => {
          return response.json({
              success: false,
              message: error.message
          })
      })}