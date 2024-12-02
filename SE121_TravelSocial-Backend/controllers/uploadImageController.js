const cloudinary =  require("../config/cloudinaryConfig") 

module.exports.uploadImage = async (req, res, next) => {
    try {
        const images = req.files.map((file) => file.path)
        const uploadImage = []
        for (let image of images) {
            const result = await cloudinary.uploader.upload(image);
            uploadImage.push({
                url: result.secure_url,
                publicId: result.public_id
            });
        }
        res.status(200).json({
            isSucess: true, 
            data: uploadImage,
            error: null
        })
    }
    catch(error)
    {
        next(error)
    }
}

