const Business = require('../models/Business')
const businessSvc = require('../services/businessSvc')

module.exports.createBusiness = async (req, res, next) => {
    const {name, address, lisenceId} = req.body;
    const newBusiness = {
        owner: res.locals.user._id,
        name, address, lisenceId
    }
    try {
        const result = await businessSvc.createBusiness(newBusiness)
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
module.exports.getAllBusiness = async (req, res, next) => {
    try {
        const result = await businessSvc.getAllBusiness()
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
module.exports.getBusinessById  = async (req, res, next) => {
    const businessId = req.params.id
    try {
        const result = await businessSvc.getBusinessById(businessId)
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
module.exports.getBusinessByName  = async (req, res, next) => {
    const name = req.query.name;
    try {
        const result = await businessSvc.getBusinessByName(name)
        res.status(200).json({
            isSuccess: true,
            data: result,
            error: null
        })
    }
    catch (error) {
        next(error)
    }
}
module.exports.updateBusiness  = async (req, res, next) => {
    const businessId = req.params.id
    const updateData = req.body
    try {
        const result = await businessSvc.updateBusiness(businessId, updateData)
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

module.exports.deleteBusiness  = async (req, res, next) => {
    const businessId = req.params.id
    try {
        const result = await businessSvc.deleteBusiness(businessId)
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