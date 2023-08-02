const modelMeja = require(`../models/index`).meja
const Op = require("sequelize").Op;

// const Op = require(`sequelize`).Op

exports.getAllMeja = async (request, response) => {
    let meja = await modelMeja.findAll();
    return response.json({
        success: true,
        data: meja,
        message: `All meja have been loaded`,
    });
};

exports.findMeja = async (request, response) => {

    let keyword = request.body.keyword;

    let meja = await modelMeja.findAll({
        where: {
            [Op.or]: [
                { meja: { [Op.substring]: keyword } },
                { status_meja: {[Op.substring]: keyword}}
            ]
        }
    })
    return response.json({
        success: true,
        data: meja,
        message: `All meja have been loaded `
    })
}


exports.addMeja = (request, response) => {

    let newMeja = {
        meja: request.body.meja,
        status_meja: request.body.status_meja
    }

    modelMeja.create(newMeja)
        .then(result => {
            return response.json({
                success: true,
                data: result,
                message: `new meja has been inseted`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })

}

exports.updateMeja = async (request, response) => {
      
        let idMeja = request.params.id;
        let dataMeja = {
          meja: request.body.meja,
          status_meja: request.body.status_meja
        }
    
        modelMeja.update(dataMeja, { where: { id_meja: idMeja } })
          .then((result) => {
            return response.json({
              success: true,
              data: result,
              message: `Data meja has been updated`,
            })
          })
          .catch((error) => {
            return response.json({
              success: false,
              message: error.message,
            })
          })
    }
    
    exports.deleteMeja = (request, response) => {
        let idMeja = request.params.id;
        modelMeja.destroy({ where: { id_meja: idMeja } })
            .then((result) => {
                return response.json({
                    success: true,
                    message: `Data user has been delete`,
                })
            })
            .catch((error) => {
                return response.json({
                    success: false,
                    message: error.message,
                })
            })
    }