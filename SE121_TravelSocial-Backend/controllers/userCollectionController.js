const UserCollection = require('../models/LocationCollection')
const UserCollectionSvc = require('../services/userCollcetionSvc')

module.exports.getAllUserCollection = async (req, res, next) => {
    try {
        const result = await UserCollectionSvc.getAllCollectionItem()
        res.status(200).json({
            isSuccess: true,
            data: result,
            error: null
        })
    }
    catch(error) {
        next(error)
    }
}

module.exports.getUserCollectionById = async (req, res, next) => {
    const id = req.params.id
    try {
        const result = await UserCollectionSvc.getCollectionItemById(id)
        res.status(200).json({
            isSuccess: true,
            data: result,
            error: null
        })
    }
    catch(error) {
        next(error)
    }
}

module.exports.getUserCollectionItemByUserId = async (req, res, next) => {
    const {userId} = req.params
    try {
        const result = await UserCollectionSvc.getCollectionItemByUserId(userId)
        res.status(200).json({
            isSuccess: true,
            data: result,
            error: null
        })
    }
    catch(error) {
        next(error)
    }
}

module.exports.createUserCollectionItem = async (req, res, next) => {
    //Can set unique cho (userId, locationId)
    const {
        locationId
    } = req.body
    const item = new UserCollection({
        locationId: locationId,
        userId: res.locals.user.id
    })
    try {
        const result = await UserCollectionSvc.createCollectionItem(item)
        res.status(200).json({
            isSuccess: true,
            data: result,
            error: null
        })
    }
    catch(error) {
        next(error)
    }
}
module.exports.updateUserCollectionItem = async (req, res, next) => {
    const id = req.params.id
    const data = req.body
    try {
        const result = await UserCollectionSvc.updateCollectionItem(id, data)
        res.status(200).json({
            isSuccess: true,
            data: result,
            error: null
        })
    }
    catch(error) {
        next(error)
    }
}
module.exports.deleteUserCollectionItem = async (req, res, next) => {
    const {id} = req.params
    try {
        const result = await UserCollectionSvc.deleteCollectionItem(id)
        res.status(200).json({
            isSuccess: true,
            data: result,
            error: null
        })
    }
    catch(error) {
        next(error)
    }
}