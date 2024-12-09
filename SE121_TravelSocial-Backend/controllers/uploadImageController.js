const cloudinary =  require("../config/cloudinaryConfig") 
const NotFoundException = require('../errors/exception')

module.exports.uploadImage = async (req, res, next) => {
    try {
        const images = req.files.map((file) => ({
            url: file.path,
            publicId: file.filename
        }))
        // console.log(images)
        // const uploadImage = []
        // for (let image of images) {
        //     const result = await cloudinary.uploader.upload(image.url);
        //     uploadImage.push({
        //         url: result.secure_url,
        //         publicId: result.public_id
        //     });
        //     console.log(result)
        // }
        res.status(200).json({
            isSucess: true, 
            data: images,
            error: null
        })
    }
    catch(error)
    {
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
