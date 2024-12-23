const { NotFoundException, ForbiddenError } = require('../errors/exception')
const Service = require('../models/Service')

const getAllService = async () => {
    const result = await Service.find()
    if(result.length !== 0)
        return result
    else
        throw new NotFoundException('Cannot found any service')
}
const getServiceById = async (serviceId) => {
    const result = await Service.findById(serviceId)
    if(result)
        return result
    else
        throw new NotFoundException('Cannot found specific service')
}

const getServiceLocationId = async (locationId) => {
    console.log(typeof locationId)
    const result = await Service.find({locationId: locationId})
    if(result.length !== 0)
        return result
    else
        throw new NotFoundException('Cannot found service in this location')
}
const createService = async (serviceData) => {
    const result = await serviceData.save()
    if(result.length !== 0)
        return result
    else
        throw new ForbiddenError('Cannot create service')
}
const updateService = async (serviceId, serviceData) => {
    const result = await Service.findByIdAndUpdate(serviceId, serviceData, {new: true, runValidators: true})
    if(result)
        return result
    else
        throw new ForbiddenError('Cannot update specific service')
}
const deleteService = async (serviceId) => {
    const result = await Service.findByIdAndDelete(serviceId)
    if(result)
        return result
    else
        throw new ForbiddenError('Cannot update specific service')
}

module.exports = {
    getAllService,
    getServiceById,
    getServiceLocationId,
    createService,
    updateService,
    deleteService,
}