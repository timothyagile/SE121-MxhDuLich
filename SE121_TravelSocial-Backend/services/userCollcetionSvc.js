const { NotFoundException, ForbiddenError } = require('../errors/exception')    
const LocationCollection = require('../models/LocationCollection')


const getAllCollectionItem = async () => {
    const result = await LocationCollection.find()
    if(result.length !== 0) {
        return result
    }
    else {
        throw new NotFoundException('Not found collection item')
    }
}
const getCollectionItemById = async (id) => {
    const result = await LocationCollection.findById(id)
    if(result) {
        return result   
    }
    else {
        throw new NotFoundException('Not found specific item')
    }
}

const getCollectionItemByUserId = async (userId) => {
    const result = await LocationCollection.find({userId : userId})
    console.log(result)
    if(result.length !== 0) {
        return result
    }
    else {
        throw new NotFoundException('Not found specific item')
    }
}

const createCollectionItem = async (collectionItem) => {
    const result = await collectionItem.save()
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
const deleteCollectionItem = async (id) => {
    const result = await LocationCollection.findByIdAndDelete(id)
    if(result) {
        return result
    }
    else {
        throw new ForbiddenError('Cannot delete item')
    }
}

module.exports = {
    getAllCollectionItem,
    getCollectionItemById,
    getCollectionItemByUserId,
    createCollectionItem,
    updateCollectionItem,
    deleteCollectionItem,
}