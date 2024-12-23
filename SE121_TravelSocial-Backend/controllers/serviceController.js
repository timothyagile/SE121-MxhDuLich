const Service = require('../models/Service')
const serviceSvc = require('../services/serviceSvc')

module.exports.getAllService = async (req, res, next) => {
    try {
        const result = await serviceSvc.getAllService()
        res.status(201).json({
            isSuccess: true,
            data: result,
            error: null
        })
    }
    catch (error) {
        next(error)
    }
}
module.exports.getServiceById = async (req, res, next) => {
    const serviceId = req.params.id
    try {
        const result = await serviceSvc.getServiceById(serviceId)
        res.status(201).json({
            isSuccess: true,
            data: result,
            error: null
        })
    }
    catch (error) {
        next(error)
    }
}
module.exports.getServiceLocationId = async (req, res, next) => {
    const {locationId} = req.params
    try {
        const result = await serviceSvc.getServiceLocationId(locationId)
        res.status(201).json({
            isSuccess: true,
            data: result,
            error: null
        })
    }
    catch (error) {
        next(error)
    }
}
module.exports.createService = async (req, res, next) => {
    const {
        locationId,
        name,
        description,
        price,
        unit,
    } = req.body
    const serviceData = new Service({
        locationId,
        name,
        description,
        price,
        unit,
    })
    try {
        const result = await serviceSvc.createService(serviceData)
        res.status(201).json({
            isSuccess: true,
            data: result,
            error: null
        })
    }
    catch (error) {
        next(error)
    }
}
module.exports.updateService = async (req, res, next) => {
    const serviceId = req.params.id
    const serviceData = req.body
    try {
        const result = await serviceSvc.updateService(serviceId, serviceData)
        res.status(201).json({
            isSuccess: true,
            data: result,
            error: null
        })
    }
    catch (error) {
        next(error)
    }
}
module.exports.deleteService = async (req, res, next) => {
    const serviceId = req.params.id
    try {
        const result = await serviceSvc.deleteService(serviceId)
        res.status(201).json({
            isSuccess: true,
            data: result,
            error: null
        })
    }
    catch (error) {
        next(error)
    }
}