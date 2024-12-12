const UserCollection = require('../models/LocationCollection')
const UserCollectionSvc = require('../services/userCollcetionSvc')

module.exports.getAllCollection = async (req, res, next) => {
    try {
        const result = await UserCollectionSvc.getAllCollection()
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

module.exports.getCollectionById = async (req, res, next) => {
    const id = req.params.id
    try {
        const result = await UserCollectionSvc.getCollectionById(id)
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

module.exports.getAllCollectionByUserId = async (req, res, next) => {
    const {userId} = req.params
    try {
        const result = await UserCollectionSvc.getAllCollectionByUserId(userId)
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

module.exports.createCollection = async (req, res, next) => {
    //Can set unique cho (userId, locationId)
    const {name} = req.body
    //console.log(res.locals.user._id)
    const newCollection = new UserCollection({
        name: name,
        userId: res.locals.user._id
    })
    try {
        const result = await UserCollectionSvc.createCollection(newCollection)
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

module.exports.createCollectionItem = async (req, res, next) => {
    const collectionId = req.params.collectionid
    const {locationId} = req.body
    try {
        const result = await UserCollectionSvc.createCollectionItem(collectionId, locationId)
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
// module.exports.updateUserCollectionItem = async (req, res, next) => {
//     const id = req.params.id
//     const data = req.body
//     try {
//         const result = await UserCollectionSvc.updateCollectionItem(id, data)
//         res.status(200).json({
//             isSuccess: true,
//             data: result,
//             error: null
//         })
//     }
//     catch(error) {
//         next(error)
//     }
// }
module.exports.deleteCollectionItem = async (req, res, next) => {
    const {collectionId, itemId} = req.params
    try {
        const result = await UserCollectionSvc.deleteCollectionItem(collectionId, itemId)
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
module.exports.deleteCollection = async (req, res, next) => {
    const collectionId = req.params.collectionId
    try {
        const result = await UserCollectionSvc.deleteCollection(collectionId)
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
