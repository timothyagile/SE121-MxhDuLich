const express = require('express');
const router = express.Router();
const recommendationController = require('../../controllers/general/recommendation.controller');

router.get('/recommend', recommendationController.getRecommendations);
router.post('/othermayyoulike', recommendationController.getOtherMayYouLike);
router.get('/othermayyoulike', recommendationController.getOtherMayYouLike);


module.exports = router;