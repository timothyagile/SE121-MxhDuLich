const {Router} = require('express');
const locationController = require('../controllers/locationController');
const {checkLocationOwner} = require('../middleware/authMiddleware');
const router = Router();
//create
router.post('/createlocation', checkLocationOwner, locationController.createNewLocation);
//read
router.get('/alllocation', locationController.getAllLocation);
router.get('/locationbycategory/:categoryId', locationController.getLocationByCategory);
router.get('/locationbyname', locationController.getLocationByName);
router.get('/locationbyid/:locationId', locationController.getLocationById);
//update
router.put('/updatelocation/:locationId', checkLocationOwner, locationController.updateLocation);
//delete
router.delete('/detelelocation/:locationId', checkLocationOwner, locationController.deleteLocation);

module.exports = router;