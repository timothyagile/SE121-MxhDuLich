const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

router.get('/recommend', recommendationController.getRecommendations);

module.exports = router;