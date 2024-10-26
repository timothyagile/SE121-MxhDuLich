const Business = require("../models/Business")
const {NotFoundException, ForbiddenError} = require("../errors/exception")

const createBusiness = async (newBusiness) => {
    const savedBusiness = await newBusiness.save()
    if(savedBusiness)
        return savedBusiness
    else
        throw new ForbiddenError("You are not allowed to create!")
}
const getAllBusiness = async () => {
    const result = await Business.find()
    if(result.length !== 0)
        return result
    else
        throw new NotFoundException('Not found any business')
}
const getBusinessById = async (businessId) => {
    const result = await Business.findById(businessId)
    if(result)
        return result
    else
        throw new NotFoundException('Not found this business')
}
const getBusinessByName = async (name) => {
    const result = await Business.find({ name: new RegExp(name, 'i') });
    if(result.length !== 0)
        return result
    else
        throw new NotFoundException('Not found this business')
}
const updateBusiness = async (businessId, updateData) => {
    const result = await Business.findByIdAndUpdate(businessId, updateData, {new: true, runValidators: true})
    if(result)
        return result
    else
        throw new NotFoundException('Not found business to update')
}
const deleteBusiness = async (businessId) => {
    const result = await Business.findByIdAndDelete(businessId)
    if(result)
        return result
    else
        throw new NotFoundException('Not found business to delete')
}


module.exports = {
    createBusiness,
    getAllBusiness,
    getBusinessById,
    getBusinessByName,
    updateBusiness,
    deleteBusiness,
}