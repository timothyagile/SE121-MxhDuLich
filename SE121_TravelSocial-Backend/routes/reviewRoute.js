const express = require('express');
const reviewController = require('../controllers/reviewController');
const {checkUser} = require('../middleware/authMiddleware');
const router = express.Router();

// Define routes for reviews
router.get('/review', reviewController.getAllReviews);
router.get('/review/:id', reviewController.getReviewById);
router.get('/review/location/:locationId', reviewController.getReviewByLocationId);

router.post('/review', checkUser ,reviewController.createReview);
router.put('review/:id', reviewController.updateReview);
router.delete('review/:id', reviewController.deleteReview);

module.exports = router;