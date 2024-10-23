const User = require('../models/User')
const authServices = require('../services/authService')
const cookie = require('cookies');
const jwt = require('jsonwebtoken');

module.exports.signup_get = (req, res) => { //Render home screen
    res.render('new user')
}

const maxAge = 30 * 60;
const createToken = (id) => {
    return jwt.sign({id}, 'travel', {
        expiresIn: maxAge   
    })
}

module.exports.signup_post = async (req, res) => { //Create new user accouut 
    const {userEmail, userPassword} = req.body
    const user = new User()
    user.userEmail = userEmail
    user.userPassword = userPassword
    try {
        const savedUser = await user.save()
        const token = createToken(savedUser._id);
        res.cookie('jwtcookie', token, {httpOnly: true ,maxAge: maxAge * 1000})
        res.status(200).json({
            isSucess: true,
            data: savedUser,
            error: null
         })
    }
    catch(error){
        console.log(error)
        res.status(400).json({
        isSucess: false,
        data: "Error, user hasn't created",
        error: error
    })
    }
}

module.exports.signin_get = (req, res) => { //Render home screen
    res.render('user sign in')
}


module.exports.signin_post =  async (req, res) => { //Check login 
    const {userEmail, userPassword} = req.body;
    try {
        const user = await User.login(userEmail, userPassword);
        res.status(200).json({
            isSucess: true,
            data: user._id,
            error: null
        })
    }
    catch (error) {
        console.log(error)
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');

}