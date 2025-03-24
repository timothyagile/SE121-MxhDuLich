const cloudinary = require('cloudinary').v2
require('dotenv').config()

cloudinary.config({ 
    cloud_name: 'dzy4gcw1k', 
    api_key: '838921598836264', 
    api_secret: process.env.CLOUDINARY_APIKEY 
});

module.exports = cloudinary