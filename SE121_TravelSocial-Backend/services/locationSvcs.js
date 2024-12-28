const Location = require('../models/Location');
const NotFoundException = require('../errors/exception').NotFoundException;

const createLocation = async (locationData) => {
    const savedLocation = await locationData.save();
    if(savedLocation)
        return savedLocation;
    else
        throw new NotFoundException('Cannot create new location');
}

const createLocationWithImage = async (locationData) => {
    const savedLocation = await locationData.save();
    if(savedLocation)
        return savedLocation;
    else {
        for (let image of images) {
            await cloudinary.uploader.destroy(image.url)
        }
        throw new NotFoundException('Cannot create new location');
    }
}

// const createSlug = (name, address) => {
//     const removeDiacritics = (str) => {
//         return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
//     };

//     const normalize = (str) => {
//         return removeDiacritics(str)
//             .toLowerCase()
//             .replace(/\s+/g, '-') // Thay khoảng trắng bằng dấu "-"
//             .replace(/[^a-z0-9-]/g, ''); // Loại bỏ ký tự không hợp lệ
//     };

//     return `${normalize(name)}-${normalize(address)}`;
// };

const getAllLocation = async () => {
    const allLocation = await Location.find();
    // for (const location of allLocation) {
    //     const slug = createSlug(location.name, location.address); // Tạo slug

    //     // Cập nhật trường slug cho tài liệu hiện tại
    //     await Location.updateOne(
    //         { _id: location._id }, // Điều kiện: tài liệu theo _id
    //         { $set: { slug } } // Cập nhật trường slug
    //     );
    // }
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

const getLocationByUserId = async (userId) => {
    const locations = await Location.find({ownerId: userId});
    if(locations.length != 0)
        return locations;
    else
        throw new Error('Not found this user location');
}

const removeDiacritics = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const getLocationByName = async (name) => {
    const normalizedInput = removeDiacritics(name).toLowerCase();
    console.log(normalizedInput);
    const locations = await Location.find(
            { 
                slug: { 
                    $regex: new RegExp(normalizedInput, 'i') 
                } 
            }
        );
    if(locations.length !== 0)
        return locations;
    else
        throw new NotFoundException('Not found this location');
    //Thêm chức năng tìm kiếm không dấu: thêm một trường tên không dấu trong database.
    //Tìm kiếm không theo thứ tự: tìm hiểu TFIDF
    //VN core nlp
}

const getLocationById = async (locationId) => {
    const location = await Location.findById(locationId);
    if(location)
        return location;
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

const deleteLocation = async(locationId) => {
    const deletedLocation = await Location.findByIdAndDelete(locationId)
    if(deletedLocation)
        return deletedLocation
    else
        throw new NotFoundException('Not found location to delete')
}

module.exports = {
    getAllLocation, 
    createLocation,
    createLocationWithImage,
    getLocationByCategory,
    getLocationByUserId,
    getLocationByName,
    getLocationById,
    updateLocation,
    deleteLocation
}