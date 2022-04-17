const ApiError = require("../error/ApiError")
const path = require('path');
const fs = require('fs');


class UploadsController {

    async uploadImage(req, res, next) {
        const { files } = req

        let tmpFile = files.upload;
        tmpFile.mv(path.join(__dirname, "..", "/static/", tmpFile.name))



        res.status(200).json({
            uploaded: true,
            url: `${process.env.THIS_URL}/static/${tmpFile.name}`
        });





    }

    async uploadFile(req, res, next) {
        const { user } = req
        try {

        }
        catch (createError) {
            next(ApiError.internal(createError))
        }
    }


}

module.exports = new UploadsController()