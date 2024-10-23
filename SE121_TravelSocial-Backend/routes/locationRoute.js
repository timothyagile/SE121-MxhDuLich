const {Router} = require('express');
const locationController = require('../controllers/locationController');
const router = Router();

router.get('/alllocation', locationController.getAllLocation);
router.get('/locationbycategory/:categoryId', locationController.getLocationByCategory);
router.get('/locationbyname', locationController.getLocationByName);

module.exports = router;