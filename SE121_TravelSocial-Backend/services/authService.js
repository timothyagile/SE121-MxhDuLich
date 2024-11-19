const User = require('../models/User'); 
const jwt = require('jsonwebtoken');
const cookie = require('cookies');
const { NotFoundException } = require('../errors/exception');



const createUser = async (user) => {
    const savedUser = await user.save()
    if(savedUser)
        return savedUser
    else
        throw Error;
};


const getAllUser = async () => {
    const users = await User.find()
    if(users.length !== 0)
        return users
    else
        throw new NotFoundException('Not found any user');
};

const getUserById = async (id) => {
    const result = await User.findById(id)
    if(result)
        return result
    else
        throw new NotFoundException('Not found specific user');
};

const updateUser = async (id, userData) => {
    const result = await User.findByIdAndUpdate(id, userData, {new: true, runValidators: true})
    if(result)
        return result
    else
        throw new NotFoundException('Can not update specific user');
};

const deleteUser = async (id) => {
    const result = await User.findByIdAndDelete(id)
    if(result)
        return result
    else
    throw new NotFoundException('Can not delete specific user');
};

module.exports = {
    createUser,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser,
};