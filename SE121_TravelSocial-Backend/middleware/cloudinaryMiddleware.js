const {CloudinaryStorage} = require("multer-storage-cloudinary")  
const cloudianry = require('../config/cloudinaryConfig')  
const multer = require('multer')  

// const storage = new CloudinaryStorage({
//     cloudinary: cloudianry,
//     params: {
//         folder: "travel-social",
//         format: "jpg",
//     }
// })

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('Multer is processing file:', file);
        cb(null, './uploads'); // Lưu vào thư mục 'uploads'
    },
    filename: (req, file, cb) => {
        console.log('Saving file as:', file.originalname);
        cb(null, Date.now() + '-' + file.originalname); // Tên tệp lưu vào hệ thống
    }
});

const upload = multer({storage: storage})
module.exports = upload
