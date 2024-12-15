const Location = require('../models/Location');
const locationSvc = require('../services/locationSvcs')
const errorHandler = require('../middleware/authMiddleware')
const cloudinary =  require("../config/cloudinaryConfig") 

//--CREATE NEW LOCATION
module.exports.createNewLocation = async (req, res, next) => {
    const {
        name,
        description,
        rating,
        address,
        category,
    } = req.body;
    // Tạo locationData
    //console.log(res.locals.user._id)

    // const images = req.files.map((file) => ({
    //     url: file.path,
    //     publicId: file.filename
    // }))

    const locationData = new Location({
        name,
        description,
        rating,
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

module.exports.createLocation = async (req, res, next) => {
    const {
        name,
        description,
        rating,
        address,
        category,
    } = req.body;
    //console.log(res.locals.user._id)
    const images = req.files.map((file) => ({
        url: file.path,
        publicId: file.filename
    }))
    try {
        const locationData = new Location({
            name,
            description,
            rating,
            address,
            category,
            ownerId: res.locals.user._id,
            image: images
        });
        const savedLocation = await locationSvc.createLocationWithImage(locationData); // Lưu địa điểm mới vào cơ sở dữ liệu
        res.status(201).json({
            isSuccess: true,
            data: savedLocation,
            error: null,
        });
    } catch (error) {
        for (let image of images) {
            await cloudinary.uploader.destroy(image.url)
        }
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

module.exports.getLocationByUserId = async (req, res, next) => {
    const { userId } = req.params; // Lấy categoryId từ URL
    try {
        const locations = await locationSvc.getLocationByUserId(userId); // Tìm theo category
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

//--GET LOCATION BY ID--\\
module.exports.getLocationById = async (req, res, next) => {
    const locationId = req.params.locationId;
    console.log(locationId)
    try {
        const result = await locationSvc.getLocationById(locationId);
        res.status(200).json({
            isSuccess: true,
            data: result,
            error: null,
        }); 
    }
    catch(error) {
        next(error)
    }
}

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