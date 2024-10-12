const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userRole: String,
    userName: String,
    userEmail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true

    },
    userPassword: {
        type: String, 
        required: true,
        minLength: 6
    },
    userPhoneNumber: String, 
    userDateOfBirth: String,
    userAddress: String,
    userAvatar: String,
}, { collection: 'User' });

const User = mongoose.model('User', userSchema);
module.exports = User;