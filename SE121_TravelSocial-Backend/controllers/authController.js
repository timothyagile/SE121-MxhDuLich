const User = require('../models/User')

module.exports.signup_get = (req, res) => { //Render home screen
    res.render('new user')
}

module.exports.signup_post = async (req, res) => { //Create new user accouut 
    //req from app {email, pass}
    //create Model user
    //Luu user vao dtb
    //Tra lai ma thanh cong
    //Neu xay ra loi thi in ra loi
    const {userEmail, userPassword} = req.body
    const user = new User()
    user.userEmail = userEmail
    user.userPassword = userPassword
    try {
        const savedUser = await user.save()
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
    try {
        const {userEmail, password} = req.body;
        const user = await User.findOne({userEmail: userEmail});
        console.log(user)
        if(password !== user.userPassword) {
            res.status(401).send("Password incorrcect");
        }
        res.status(200).json({
            isSucess: true,
            data: "Login success",
            error: null
        })
    }
    catch (error) {
        console.log(error);
        res.send({status: "error login", error });
    }
}