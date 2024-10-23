const mongoose  = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userRole: String,
    userName: String,
    userEmail: {
        type: String,
        required: [true, 'Hãy nhập email của bạn'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Email chưa chính xác']
    },
    userPassword: {
        type: String, 
        required: [true, 'Hãy nhập mật khẩu của bạn'],
        minLength: [6, 'Mật khẩu cần tối thiểu 6 kí tự']
    },
    userPhoneNumber: String, 
    userDateOfBirth: String,
    userAddress: String,
    userAvatar: String,
}, { collection: 'User' });

userSchema.pre('save', async function(next){
    const salt =  await bcrypt.genSalt();
    this.userPassword =  await bcrypt.hash(this.userPassword, salt);
    next();
})

userSchema.statics.login = async function (userEmail, password) {
    const user = await this.findOne({userEmail})
    if(user) {
        const auth = await bcrypt.compare(password, user.userPassword);
        if(auth) {
            return user;
        }
        else {
            return "Incorrect password";
        }
    }
    else {
        return "Incorrect email";
    }
}
const User = mongoose.model('User', userSchema);
module.exports = User;