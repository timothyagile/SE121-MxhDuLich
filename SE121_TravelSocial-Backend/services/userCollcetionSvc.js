const { NotFoundException, ForbiddenError } = require('../errors/exception')    
const LocationCollection = require('../models/LocationCollection')
const Location = require('../models/Location')
const { findByIdAndDelete } = require('../models/User')


const getAllCollection = async () => {
    const result = await LocationCollection.find().populate('item')
    if(result.length !== 0) {
        return result
    }
    else {
        throw new NotFoundException('Not found collection item')
    }
}
const getCollectionById = async (id) => {
    const result = await LocationCollection.findById(id).populate('item')
    if(result) {
        return result   
    }
    else {
        throw new NotFoundException('Not found specific item')
    }
}

const getAllCollectionByUserId = async (userId) => {
    const result = await LocationCollection.find({userId : userId}).populate('item')
    console.log(result)
    if(result.length !== 0) {
        return result
    }
    else {
        throw new NotFoundException('Not found specific item')
    }
}

const createCollection = async (newCollection) => {
    //console.log(newCollection)
    const result = await newCollection.save()
    if(result) {
        return result
    }
    else {
        throw new ForbiddenError('Cannot create collection')
    }
}

const createCollectionItem = async(collectionId, locationId) => {
    const collection = await LocationCollection.findById(collectionId)
    const location = await Location.findById(locationId)
    if (!collection) {
        throw new NotFoundException('This collection is not exist')
    }
    if (!location) {
        throw new NotFoundException('This location is not exist')
    }
    
    if (collection.item.includes(locationId)) {
        throw new ForbiddenError('This location was in collection')
    }
    collection.item.push(locationId)
    const result = await collection.save()
    if(result) {
        return result
    }
    else {
        throw new ForbiddenError('Cannot create item')
    }
}
const updateCollectionItem= async (id, data) => {
    const result = await LocationCollection.findByIdAndUpdate(id, data, {new: true, runValidators: true})
    if(result) {
        return result
    }
    else {
        throw new ForbiddenError('Cannot update item')
    }
}
const deleteCollectionItem = async (collectionId, locationId) => {
    const collection = await LocationCollection.findById(collectionId)
    console.log(locationId)
    const location = await collection.item.includes(locationId)
    if (!collection) {
        throw new NotFoundException('This collection is not exist in collection')
    }
    if (!location) {
        throw new NotFoundException('This location is not exist')
    }
    const result = await LocationCollection.findByIdAndUpdate(
        collectionId,
        { $pull: { item: locationId } }, // $pull tự động xóa phần tử khớp
        { new: true , runValidators: true} // Trả về collection đã cập nhật
    );
    if(result) {
        return result
    }
    else {
        throw new ForbiddenError('Cannot delete item')
    }
}

const deleteCollection = async (collectionId) => {
    const result = await LocationCollection.findByIdAndDelete(collectionId)
    if(result) {
        return result
    }
    else {
        throw new ForbiddenError('Cannot delete item')
    }
}

module.exports = {
    getAllCollection,
    getCollectionById,
    getAllCollectionByUserId,
    createCollection,
    createCollectionItem,
    updateCollectionItem,
    deleteCollectionItem,
    deleteCollection
}