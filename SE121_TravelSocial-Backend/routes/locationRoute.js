const {Router} = require('express');
const locationController = require('../controllers/locationController');
const {checkLocationOwner} = require('../middleware/authMiddleware');
const router = Router();

router.post('/createlocation', checkLocationOwner, locationController.createNewLocation);
router.get('/alllocation', locationController.getAllLocation);
router.get('/locationbycategory/:categoryId', locationController.getLocationByCategory);
router.get('/locationbyname', locationController.getLocationByName);
router.put('/updatelocation/:locationId', checkLocationOwner, locationController.updateLocation);
router.delete('/detelelocation/:locationId', checkLocationOwner, locationController.deleteLocation);

module.exports = router;