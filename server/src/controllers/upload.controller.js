const cloudinaryService = require('../cloudinary/cloudinary.service');
const { OK, CREATED } = require("../core/success.response");

class uploadController{
    async getAll(req, res){
        return new OK({
            message: "Get all successfully",
            statusCode: 200,
            data: await cloudinaryService.getAll(),
        }).send(res);
    }

    async uploadSingle(req, res){
        return new OK({
            message: "Upload single successfully",
            statusCode: 200,
            data: await cloudinaryService.uploadSingle(req.file),
        }).send(res);
    };

    async uploadMultiple(req, res){
        return new OK({
            message: "Upload multiple successfully",
            statusCode: 200,
            data: await cloudinaryService.uploadMultiple(req.files),
        }).send(res);
    };
}

module.exports = new uploadController();