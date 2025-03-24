const cloudinary =  require("../../config/cloudinary.config") 
const NotFoundException = require('../../errors/exception')
const uploadFileSvc = require('../../services/general/upload.service')

module.exports.uploadImage = async (req, res, next) => {
    try {
        const files = req.files;

        const images = uploadFileSvc.upload(files)

        res.status(201).json({
            isSuccess: true,
            data: images,
            error: null,
        });
    } 
    catch (error) {
        next(error)
    }
}

module.exports.deleteImage = async (req, res, next) => {
    try {
        const { folderId, publicId } = req.params; // Lấy folder và publicId từ tham số route
        const fullPublicId = `${folderId}/${publicId}`;
        const result = await cloudinary.uploader.destroy(fullPublicId);
        console.log(result)
        if (result == 'not found') {
            throw new NotFoundException('Not found image to delete')
        }
        res.status(200).json({
            isSucess: true, 
            data: result,
            error: null
        }) 
    }
    catch (error) {
        next(error)
    }
}
