const { NotFoundException, ForbiddenError } = require('../../errors/exception')    
const LocationCollection = require('../../models/general/location-collection.model')
const Location = require('../../models/general/location.model')
const { findByIdAndDelete } = require('../../models/general/user.model')
const mongoose = require('mongoose')

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
        // throw new ForbiddenError('This location was in collection')
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
    const collection = await LocationCollection.findById(collectionId);
    if (!collection) {
        throw new NotFoundException('This collection is not exist in collection');
    }
    // Convert all item ids to string for comparison
    const locationExists = collection.item.some(
        (item) => item.toString() === locationId.toString()
    );
    if (!locationExists) {
        throw new NotFoundException('This location is not exist');
    }
    // Use ObjectId for $pull if item is ObjectId
    const pullId = mongoose.Types.ObjectId.isValid(locationId) ? new mongoose.Types.ObjectId(locationId) : locationId;
    const result = await LocationCollection.findByIdAndUpdate(
        collectionId,
        { $pull: { item: pullId } },
        { new: true, runValidators: true }
    );
    if (result) {
        return result;
    } else {
        throw new ForbiddenError('Cannot delete item');
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