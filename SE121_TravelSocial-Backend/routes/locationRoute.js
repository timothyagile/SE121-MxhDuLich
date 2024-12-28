const {Router} = require('express');
const locationController = require('../controllers/locationController');
const {checkLocationOwner} = require('../middleware/authMiddleware');
const upload = require('../middleware/cloudinaryMiddleware')
const router = Router();
//create
//router.post('/createlocation', checkLocationOwner, locationController.createNewLocation);
//create with image
router.post('/createlocation', checkLocationOwner, upload.array('images', 10), locationController.createLocation);
//read
router.get('/alllocation', locationController.getAllLocation);
router.get('/locationbycategory/:categoryId', locationController.getLocationByCategory);

router.get('/locationbyuserid/:userId', locationController.getLocationByUserId);
router.get('/locationbyname', locationController.getLocationByName);

router.get('/locationbyid/:locationId', locationController.getLocationById);
//update
router.put('/updatelocation/:locationId', checkLocationOwner, locationController.updateLocation);
//delete
router.delete('/detelelocation/:locationId', checkLocationOwner, locationController.deleteLocation);

//MAIL SERVICES
router.get('/location/approve/email/:locationId', locationController.sendApproveEmail)

module.exports = router;