const Location = require('../models/Location');
const NotFoundException = require('../errors/exception')

const createLocation = async (locationData) => {
    const savedLocation = await locationData.save();
    if(savedLocation)
        return savedLocation;
    else
        throw new NotFoundException('Cannot create new location');
}

const getAllLocation = async () => {
    const allLocation = await Location.find();
    if(allLocation.length !== 0)
        return allLocation;
    else
        throw new NotFoundException('Not found any location in database');
}

const getLocationByCategory = async (categoryId) => {
    const locations = await Location.find({'category.id': categoryId});
    if(locations.length != 0)
        return locations;
    else
        throw new NotFoundException('Not found this category location');
}

const getLocationByName = async (name) => {
    const locations = await Location.find({ name: new RegExp(name, 'i') });
    if(locations.length != 0)
        return locations;
    else
        throw new NotFoundException('Not found this location');
}

const updateLocation = async(locationId, updateData) => {
    const updatedLocation = await Location.findByIdAndUpdate(locationId, updateData, {new: true, runValidators: true})
    if(updatedLocation)
        return updatedLocation
    else
        throw new NotFoundException('Not found location to update')
}

const deleteLocation = async(locationId, updateData) => {
    const deletedLocation = await Location.findByIdAndDelete(locationId)
    if(deletedLocation)
        return deletedLocation
    else
        throw new NotFoundException('Not found location to delete')
}

module.exports = {
    getAllLocation,
    createLocation,
    getLocationByCategory,
    getLocationByName,
    updateLocation,
    deleteLocation
}