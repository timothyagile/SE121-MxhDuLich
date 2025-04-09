const Location = require('../../models/general/location.model');
const locationSvc = require('../../services/general/location.service')
const errorHandler = require('../../middleware/auth.middleware')
const cloudinary =  require("../../config/cloudinary.config"); 
const bodyParser = require('body-parser'); 
const { compare } = require('bcryptjs');

//--CREATE NEW LOCATION
module.exports.createNewLocation = async (req, res, next) => {
    const {
        name,
        description,
        rating,
        address,
        category,
    } = req.body;
    

    const locationData = new Location({
        name,
        description,
        rating,
        address,
        category,
        image: null,
        ownerId: res.locals.user._id
    });
    try {
        if (!req.files) {
            // No file was uploaded
            return res.status(400).json({ error: "No file uploaded" });
        }
        const images = req.files.map((file) => ({
            url: file.path,
            publicId: file.filename
        }))
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
    try {
        const {
            name,
            description,
            address,
            category,
        } = req.body;
        const parseredCategory = JSON.parse(category)
        //console.log(res.locals.user._id)
        const images = req.files.map((file) => ({
            url: file.path,
            publicId: file.filename
        }))
        // console.log(images)
        const locationData = new Location({
            name,
            description,
            address,
            category: parseredCategory,
            ownerId: res.locals.user._id,
            image: images,
            slug: ''
        });
        const savedLocation = await locationSvc.createLocationWithImage(locationData); // Lưu địa điểm mới vào cơ sở dữ liệu
        res.status(201).json({
            isSuccess: true,
            data: savedLocation,
            error: null,
        });
    } catch (error) {
        req.files.map(async file => {
            try {
                await cloudinary.uploader.destroy(file.filename);
                console.log(`Deleted: ${file.filename}`);
                res.status(404).json({
                isSuccess: true,
                data: 'upload fail',
                error: null,
            });
            } catch (err) {
                console.error(`Failed to delete ${file.filename}:`, err.message);
            }
        })
    }
}

//--GET ALL LOCATION DATA--\\
module.exports.getAllLocation = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const result = await locationSvc.getAllLocation(page, limit); // Lấy tất cả địa điểm từ cơ sở dữ liệu
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const locations = await locationSvc.getLocationByCategory(categoryId, page, limit); // Tìm theo category
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


//EMAIL SENDER

module.exports.sendApproveEmail = async (req, res, next) => {
    const locationId  = req.params.locationId;
    try {
        const location = await locationSvc.getInfoOwnerByLocationId(locationId)
        const email = location.ownerId.userEmail
        const result = await locationSvc.sendAppoveEmailService(email)
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

module.exports.searchLocationsAndRooms = async (req, res) => {
    try {
        const { rating, costMin, costMax, category, province, services } = req.query;

        // Tạo các điều kiện lọc động
        const locationQuery = {};
        if (rating) locationQuery['rating'] = { $gte: parseFloat(rating) };
        if (category) locationQuery['category.id'] = category;
        if (province) {
            const provinceArray = Array.isArray(province) ? province : province.split(',');
            locationQuery['province'] = { $in: provinceArray };
        }
        if (services) {
            const servicesArray = Array.isArray(services) ? services : services.split(',');
            locationQuery['services'] = { $all: servicesArray };
        }
        const roomPriceQuery = {};
        if (costMin) roomPriceQuery.$gte = parseFloat(costMin);
        if (costMax) roomPriceQuery.$lte = parseFloat(costMax);

        const aggregatePipeline = [
            // Kết nối với Rooms
            {
                $lookup: {
                    from: 'Room',
                    localField: '_id',
                    foreignField: 'locationId',
                    as: 'rooms',
                },
            },
            // {
            //     $project: {
            //         _id: 1,
            //         location: '$name',
            //         rating: 1,
            //         rooms: 1, // Kiểm tra xem `rooms` có dữ liệu không
            //     },
            // },
            // Áp dụng điều kiện lọc cho Location
            {
                $match: locationQuery,
            },
            // Nếu có điều kiện lọc giá, lọc các phòng theo `pricePerNight`
            ...(costMin || costMax
                ? [
                    {
                        $addFields: {
                            matchingRooms: {
                                $filter: {
                                    input: '$rooms',
                                    as: 'room',
                                    cond: {
                                        $and: [
                                            { $gte: ['$$room.pricePerNight', roomPriceQuery.$gte || 0] },
                                            { $lte: ['$$room.pricePerNight', roomPriceQuery.$lte || Infinity] },
                                        ],
                                    },
                                },
                            },
                        },
                    },
                    {
                        $match: {
                            'matchingRooms.0': { $exists: true }, // Chỉ giữ các Location có ít nhất 1 phòng thỏa mãn
                        },
                    },
                ]
                : []),
            // Dự án kết quả trả về
            {
                $project: {
                    _id: 1,
                    location: '$name',
                    rating: 1,
                    category: 1,
                    province: 1,
                    services: 1,
                    matchingRooms: 1,
                },
            },
        ];

        const locations = await Location.aggregate(aggregatePipeline);

        res.json(locations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};