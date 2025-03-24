const Room = require('../../models/booking/room.model')
const roomSvc = require('../../services/booking/room.service')

module.exports.getAllRoom = async (req, res, next) => {
    try {
        const rooms = await roomSvc.getAllRoom()
        res.status(200).json({
            isSuccess: true,
            data: rooms,
            error: null
        })
    }
    catch (error) {
        next(error)
    }
}
module.exports.getRoomById = async (req, res, next) => {
    const roomId = req.params.roomId
    try{
        const rooms = await roomSvc.getRoomById(roomId)
        res.status(201).json({
            isSuccess: true,
            data: rooms,
            error: null
        })
    }
    catch (error) {
        next(error)
    }
}

module.exports.getRoomByLocationId = async(req, res, next) => {
    const {locationId} = req.params
    try{
        const rooms = await roomSvc.getRoomByLocationId(locationId)
        res.status(201).json({
            isSuccess: true,
            data: rooms,
            error: null
        })
    }
    catch (error) {
        next(error)
    }
}

//CREATE: cân nhắc hỗ trợ import thông tin từ file excel
module.exports.createRoom = async (req, res, next) => {
    const {
        locationId,
        name,
        quantity,
        rating,
        pricePerNight,
        capacity,
        description,
        facility,
        area,
        bed,
        image, 
    } = req.body
    const roomData =  new Room({
        locationId,
        name,
        quantity,
        rating,
        pricePerNight,
        capacity,
        description,
        facility,
        area,
        bed,
        image, 
    })
    try{
        const savedRoom = await roomSvc.createRoom(roomData)
        res.status(201).json({
            isSuccess: true,
            data: savedRoom,
            error: null
        })
    }
    catch (error) {
        next(error)
    }
}
module.exports.updateRoom = async (req, res, next) => {
    const {roomId} = req.params
    const roomData = req.body
    try {
        const result = await roomSvc.updateRoom(roomId, roomData)
        res.status(201).json({
            isSuccess: true,
            data: result,
            error: null
        })
    }
    catch (error) {
        next(error)
    }
}
module.exports.deteleRoom = async (req, res, next) => {
    const {roomId} = req.params
    try{
        const result = await roomSvc.deteleRoom(roomId)
        res.status(201).json({
            isSuccess: true,
            data: result,
            error: null
        })
    }
    catch (error) {
        next(error)
    }
}