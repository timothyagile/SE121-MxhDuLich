const Router = require('express')
const userCollectionController = require('../controllers/userCollectionController')
const authMiddleware = require('../middleware/authMiddleware')

const router = new Router()

router.get('/collection/getall', userCollectionController.getAllUserCollection)
router.get('/collection/getbyid/:id', userCollectionController.getUserCollectionById)
router.get('/collection/getbyuserid/:userId', userCollectionController.getUserCollectionItemByUserId)
router.post('/collection/create', authMiddleware.checkUser ,userCollectionController.createUserCollectionItem)
router.put('/collection/update/:id', userCollectionController.updateUserCollectionItem)
router.delete('/collection/delete/:id', userCollectionController.deleteUserCollectionItem)


module.exports = router
