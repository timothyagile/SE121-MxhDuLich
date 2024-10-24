const Location = require('../models/Location');
const locationSvc = require('../services/locationSvcs')
const errorHandler = require('../middleware/authMiddleware')

//--CREATE NEW LOCATION
module.exports.createNewLocation = async (req, res, next) => {
    const {
        name,
        description,
        rating,
        image,
        address,
        category,
        dateCreated,
    } = req.body;
        // Tạo locationData
    console.log(res.locals.user._id)
    const locationData = new Location({
        name,
        description,
        rating,
        image,
        address,
        category,
        ownerId: res.locals.user._id
    });
    try {
        const savedLocation = await locationSvc.createLocation(locationData); // Lưu địa điểm mới vào cơ sở dữ liệu
        res.status(201).json({
            isSuccess: true,
            data: savedLocation,
            error: null,
        });
    } catch (error) {
        next(error)
    }

}

//--GET ALL LOCATION DATA--\\
module.exports.getAllLocation = async (req, res, next) => {
    try {
        const result = await locationSvc.getAllLocation()
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

//--GET LOCATION DATA BY CATEGORY--\\
module.exports.getLocationByCategory = async (req, res, next) => {
    const { categoryId } = req.params; // Lấy categoryId từ URL
    try {
        const locations = await locationSvc.getLocationByCategory(categoryId); // Tìm theo category
        res.status(200).json({
            isSuccess: true,
            data: locations,
            error: null,
        });
    } catch (error) {
        next(error)
    }
};

//--GET LOCATION DATA BY NAME--\\
module.exports.getLocationByName = async (req, res, next) => {
    const { name } = req.query; // Lấy tên từ query string

    try {
        const locations = await locationSvc.getLocationByName(name);
        res.status(200).json({
            isSuccess: true,
            data: locations,
            error: null,
        });
    } catch (error) {
        next(error)
    }
};

//--UPDATE LOCATION DATA--\\

module.exports.updateLocation = async (req, res, next) => {
    const { locationId } = req.params;
    const updateData = req.body;
    try {
        const updatedLocation = await locationSvc.updateLocation(locationId, updateData)
        res.status(200).json({
            isSuccess: true,
            data: updatedLocation,
            error: null,
        });
    }
    catch(error) {
        next(error)
    }
}

module.exports.deleteLocation = async (req, res, next) => {
    const { locationId } = req.params;
    try {
        const deletedLocation = await locationSvc.deleteLocation(locationId)
        res.status(200).json({
            isSuccess: true,
            data: deletedLocation,
            error: null,
        });
    }
    catch(error) {
        next(error)
    }
}

//--DELETE LOCATION DATA--\\