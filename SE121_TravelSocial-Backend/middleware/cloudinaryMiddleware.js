const {CloudinaryStorage} = require("multer-storage-cloudinary")  
const cloudianry = require('../config/cloudinaryConfig')  
const multer = require('multer')  

const storage = new CloudinaryStorage({
    cloudinary: cloudianry,
    params: {
        folder: "travel-social",
        format: "jpg",
    }
})

const upload = multer({storage: storage})
module.exports = upload
