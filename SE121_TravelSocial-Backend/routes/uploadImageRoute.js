const {Router} = require('express');
const uploadImageController = require('../controllers/uploadImageController')
const upload = require('../middleware/cloudinaryMiddleware') 
const router = Router();

router.post('/upload', upload.array('images', 10), uploadImageController.uploadImage)
router.delete('/upload/:folderId/:publicId', uploadImageController.deleteImage)

module.exports = router;