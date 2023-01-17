const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    firstName: { 
        type: String
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
    },
    bio: {
        type: String,
    },
    profileImg: {
        type: String,
    },
    location: {
        type: String,
    },
    instruments: {
        type: Array,
    },
    genres: {
        type: Array,
    },
    friends: {
        type: Array,
    },
    cloudinary_id: {
        type: String,
    },
});
userSchema.methods.matchPassword = async function (incomingPassword) {
    return await bcrypt.compare(incomingPassword, this.password);
};
userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model('User', userSchema);
module.exports = User;
