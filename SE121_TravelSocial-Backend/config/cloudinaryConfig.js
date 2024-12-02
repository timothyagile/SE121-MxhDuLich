const cloudinary = require('cloudinary').v2
const cloudinaryAPI = require('./serectAPI')

cloudinary.config({ 
    cloud_name: 'dzy4gcw1k', 
    api_key: '838921598836264', 
    api_secret:  cloudinaryAPI// Click 'View API Keys' above to copy your API secret
});

module.exports = cloudinary