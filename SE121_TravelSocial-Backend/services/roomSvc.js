const Room = require("../models/Room")

const {NotFoundException, ForbiddenError} = require("../errors/exception")
const { findByIdAndUpdate } = require("../models/Business")

const getAllRoom = async () => {
    const rooms = await Room.find()
    if(rooms.length !== 0)
        return rooms
    else
        throw new NotFoundException('Khong tim thay phong nao')
}
const getRoomById = async (id) => {
    const rooms = await Room.findById(id)
    if(room)
        return room
    else
        throw new NotFoundException('Khong tim thay phong nao')
}
const createRoom = async (roomData) => {
    const savedRoom = await roomData.save()
    if(savedRoom)
        return savedRoom
    else
        throw new ForbiddenError('Tao phong that bai')
}
const updateRoom = async (roomId, roomData) => {
    const result = await Room.findByIdAndUpdate(roomId, roomData, {new: true, runValidators: true})
    if(result)
        return result
    else
        throw new ForbiddenError('Cap nhat that bai')
}
const deteleRoom = async (roomId) => {
    const result = await Room.findByIdAndDelete(roomId)
    if(result)
        return result
    else
        throw new ForbiddenError('Xoa that bai')
}

module.exports = {
    getAllRoom,
    getRoomById,
    createRoom,
    updateRoom,
    deteleRoom,
}