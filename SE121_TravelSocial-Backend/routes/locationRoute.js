const {Router} = require('express');
const locationController = require('../controllers/locationController');
const {checkUser} = require('../middleware/authMiddleware');
const router = Router();

router.post('/createlocation', checkUser, locationController.createNewLocation);
router.get('/alllocation', locationController.getAllLocation);
router.get('/locationbycategory/:categoryId', locationController.getLocationByCategory);
router.get('/locationbyname', locationController.getLocationByName);

module.exports = router;