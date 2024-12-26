const { NotFoundException } = require('../errors/exception')
const Review = require('../models/Review')

const getAllReviews = async () => {
    const result = await Review.find()
    if(result.length !== 0)
        return result
    else 
        throw new NotFoundException('No review found')
}

const getReviewById = async (id) => {
    const result = await Review.findById(id)
    if(result)
        return result
    else 
        throw new NotFoundException('Can not found this review')
}

const getReviewByLocationId = async (locationId) => {
    const result = await Review.find({locationId: locationId})
    if(result.length !== 0)
        return result
    else 
        throw new NotFoundException('Can not found review for this location')
}

const createReview = async (reviewData) => {
    const result = await reviewData.save()
    if(result)
        return result
    else 
        throw new NotFoundException('Can not create this review')
}

const updateReview = async (id, reviewData) => {
    const result = await Review.findByIdAndUpdate(id, reviewData, {new: true, runValidators: true}) 
    if(result)
        return result
    else 
        throw new NotFoundException('Can not update this review')
}
const deleteReview = async () => {
    const result = await Review.findByIdAndDelete(id) 
    if(result)
        return result
    else 
        throw new NotFoundException('Can not delete this review')
}

module.exports = {
    getAllReviews,
    getReviewById,
    getReviewByLocationId,
    createReview,
    updateReview,
    deleteReview,
}