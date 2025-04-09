const {CloudinaryStorage} = require("multer-storage-cloudinary")  
const cloudinary = require('../config/cloudinary.config')  
const path = require('path');
const multer = require('multer')  

function uploadMiddleware(folderName) {
    const storage = new CloudinaryStorage({
      cloudinary: cloudinary,
      params: (req, file) => {
        const folderPath = `${folderName.trim()}`; // Update the folder path here
        const fileExtension = path.extname(file.originalname).substring(1);
        const publicId = `file-${Date.now()}-${file.originalname}`;
        
        return {
          folder: folderPath,
          public_id: publicId,
          format: fileExtension,
        };
      },
    });
  
    return multer({
      storage: storage,
      limits: {
        fileSize: 5 * 1024 * 1024, // keep images size < 5 MB
      },
    });
  }


module.exports = uploadMiddleware
