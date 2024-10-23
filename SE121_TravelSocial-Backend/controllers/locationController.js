const Location = require('../models/Location');

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

// Tìm địa điểm theo tên
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