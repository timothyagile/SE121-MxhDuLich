const Location = require('../models/Location');

//--CREATE NEW LOCATION
module.exports.createNewLocation = async (req, res) => {
    const {
        ownerId,
        name,
        description,
        rating,
        image,
        address,
        category,
        dateCreated,
    } = req.body;
    const newLocation = new Location({
        ownerId: res.locals.user.id,
        name,
        description,
        rating,
        image,
        address,
        category,
    });
    try {
        const savedLocation = await newLocation.save(); // Lưu địa điểm mới vào cơ sở dữ liệu
        res.status(201).json({
            isSuccess: true,
            data: savedLocation,
            error: null,
        });
    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            data: null,
            error: error.message,
        });
    }

}

//--GET ALL LOCATION DATA--\\
module.exports.getAllLocation = async (req, res) => {
    const allLocation = await Location.find();
    console.log(allLocation);
    try {
        res.status(200).json({
            isSuccess: true,
            data: allLocation,
            error: null
        })
    }
    catch(error) {
        console.log(error);
        res.status(404).json({
            isSuccess: false,
            data: error,
            error: error,
        })
    }
}

//--GET LOCATION DATA BY CATEGORY--\\
module.exports.getLocationByCategory = async (req, res) => {
    const { categoryId } = req.params; // Lấy categoryId từ URL
    try {
        const locations = await Location.find({ 'category.id': categoryId }); // Tìm theo category
        res.status(200).json({
            isSuccess: true,
            data: locations,
            error: null,
        });
    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            data: null,
            error: error.message,
        });
    }
};

//--GET LOCATION DATA BY NAME--\\
module.exports.getLocationByName = async (req, res) => {
    const { name } = req.query; // Lấy tên từ query string

    try {
        const locations = await Location.find({ name: new RegExp(name, 'i') });
        res.status(200).json({
            isSuccess: true,
            data: locations,
            error: null,
        });
    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            data: null,
            error: error.message,
        });
    }
};

//--UPDATE LOCATION DATA--\\

//--DELETE LOCATION DATA--\\