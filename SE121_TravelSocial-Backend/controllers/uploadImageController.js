const cloudinary =  require("../config/cloudinaryConfig") 
const NotFoundException = require('../errors/exception')

module.exports.uploadImage = async (req, res, next) => {
    try {
        if (!req.files) {
            // No file was uploaded
            return res.status(400).json({ error: "No file uploaded" });
        }
        const images = req.files.map((file) => ({
            url: file.path,
            publicId: file.filename
        }))
        console.log("Da luu hinh")
        res.status(201).json({
            isSuccess: true,
            data: images,
            error: null,
        });
    } 
    catch (error) {
        req.files.map(async file => {
            try {
              await cloudinary.uploader.destroy(file.filename);
              console.log(`Deleted: ${file.filename}`);
              res.status(404).json({
                isSuccess: true,
                data: 'upload fail',
                error: null,
            });
            } catch (err) {
              console.error(`Failed to delete ${file.filename}:`, err.message);
            }
          })
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
