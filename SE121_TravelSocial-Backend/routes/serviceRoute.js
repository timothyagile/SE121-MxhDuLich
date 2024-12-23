const Router = require('express')
const serviceController = require('../controllers/serviceController')

const router = new Router()

router.get('/service', serviceController.getAllService)
router.get('/service/:id', serviceController.getServiceById)
router.get('/service/location/:locationId', serviceController.getServiceLocationId)
router.post('/service', serviceController.createService)
router.put('/service/update/:id', serviceController.updateService)
router.delete('/service/:id', serviceController.deleteService)

module.exports = router