const User = require('../models/User'); 
const jwt = require('jsonwebtoken');
const cookie = require('cookies')



const createUser = async (user) => {
    const savedUser = await user.save()
    if(savedUser)
        return savedUser
    else
        throw Error;
};

module.exports = {
    createUser,
};