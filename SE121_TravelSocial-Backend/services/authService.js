const User = require('../models/User'); 
const jwt = require('jsonwebtoken');
const cookie = require('cookies')



const createUser = async ({userEmail, userPassword}) => {
    const user = new User();
    user.userEmail = userEmail;
    user.userPassword = userPassword;
    try {
        const savedUser = await user.save();
        return { 
            isSuccess: true, 
            data: savedUser,
            error: null
        };
    } catch (error) {
        throw new Error("Error, user hasn't created: " + error.message);
    }
};

module.exports = {
    createUser,
};