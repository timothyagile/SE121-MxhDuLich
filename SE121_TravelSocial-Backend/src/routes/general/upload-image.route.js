const {Router} = require('express');
const uploadImageController = require('../../controllers/general/upload-image.controller')
const uploadMiddleware = require('../../middleware/cloudinary.middleware') 
const upload = uploadMiddleware('travel-social')
const router = Router();

router.post('/upload', upload.array('files', 10), uploadImageController.uploadImage)
router.delete('/upload/:folderId/:publicId', uploadImageController.deleteImage)

module.exports = router;