const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userRole: String,
    userName: String,
    userEmail: String,
    userPassword: String,
    userPhoneNumber: String, 
    userDateOfBirth: String,
    userAddress: String,
    userAvatar: String,
}, { collection: 'User' });

const User = mongoose.model('User', userSchema);
module.exports = User;