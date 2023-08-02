const userModel = require(`../models/index`).user
const md5 = require(`md5`)
const jsonwebtoken = require("jsonwebtoken")
const SECRET_KEY = "secretcode"
const Op = require(`sequelize`).Op

exports.login = async (request,response) => {
    try {
        const params = {
            username: request.body.username,
            password: md5(request.body.password),
        };
        console.log(params.username)
        const findUser = await userModel.findOne({ where: params});
        if (findUser == null) {
            return response.status(404).json({
                message: "username or password doesn't match",
                err: error,
            });
        }
        console.log(findUser)
        //generate jwt token
        let tokenPayLoad = {
            id_user: findUser.id_user,
            username: findUser.username,
            role: findUser.role,
        };
        tokenPayLoad = JSON.stringify(tokenPayLoad);
        let token = await jsonwebtoken.sign(tokenPayLoad,SECRET_KEY);
  
        return response.status(200).json({
            message: "Success login",
            data:{
                token: token,
                id_user: findUser.id_user,
                username: findUser.username,
                role: findUser.role,
            },
        });
    } catch (error){
        console.log(error);
        return response.status(500).json({
            message: "Internal error",
            err: error,
        });
    }
  };
  

exports.getAllUser = async (request, response) => {
    let user = await userModel.findAll()
    return response.json({
        success: true,
        data: user,
        message: `All user have been loaded`
    })
}

exports.findUser = async (request, response) => {

    let keyword = request.body.keyword

    let user = await userModel.findAll({
        where: {
            [Op.or]: [
                { nama_user: { [Op.substring]: keyword } }
            ]
        }
    })
    return response.json({
        success: true,
        data: user,
        message: `All user have been loaded `
    })
}


exports.addUser = (request, response) => {

    let newUser = {
        nama_user: request.body.nama_user,
        role: request.body.role,
        username: request.body.username,
        password: md5(request.body.password)
    }

    userModel.create(newUser)
        .then(result => {
            return response.json({
                success: true,
                data: result,
                message: `new user has been inseted`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })

}

exports.updateUser = (request, response) => {
    let idUser = request.params.id
    let dataUser = {
        nama_user: request.body.nama_user,
        role: request.body.role,
        username: request.body.username,
        password: md5(request.body.password)
    }

    userModel.update(dataUser, { where: { id_user: idUser } })
        .then(result => {
            return response.json({
                success: true,
                message: `Data user has been updated`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}

exports.deleteUser = (request, response) => {

    let idUser = request.params.id


    userModel.destroy({ where: { id_user: idUser } })
        .then(result => {
            return response.json({
                success: true,
                message: `Data user has been delete`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}