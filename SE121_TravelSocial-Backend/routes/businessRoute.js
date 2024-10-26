const Router = require('express')
const businessController  = require('../controllers/businessController')
const {checkLocationOwner} = require('../middleware/authMiddleware')

const router = Router()

router.post('/newbusiness', checkLocationOwner, businessController.createBusiness)
router.get('/allbusiness', businessController.getAllBusiness)
router.get('/businessbyid/:id', businessController.getBusinessById)
router.get('/businessbyname/', businessController.getBusinessByName)
router.put('/updatebusiness/:id', businessController.updateBusiness)
router.delete('/deletebusiness/:id', businessController.deleteBusiness)

module.exports = router