const Router = require('express')
const userCollectionController = require('../controllers/userCollectionController')
const authMiddleware = require('../middleware/authMiddleware')

const router = new Router()

router.get('/collection/getall', userCollectionController.getAllCollection)
router.get('/collection/getbyid/:id', userCollectionController.getCollectionById)
router.get('/collection/getbyuserid/:userId', userCollectionController.getAllCollectionByUserId)

router.post('/collection/create', authMiddleware.checkUser ,userCollectionController.createCollection)
router.post('/collection/createitem/:collectionid', userCollectionController.createCollectionItem)
//
//router.put('/collection/update/:id', userCollectionController.updateUserCollection)

router.delete('/collection/deletecollection/:collectionId', userCollectionController.deleteCollection)
router.delete('/collection/deleteitem/:collectionId/:itemId', userCollectionController.deleteCollectionItem)

module.exports = router
