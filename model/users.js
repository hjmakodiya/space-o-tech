const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: { type: String, required: true, trim: true }, 
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true }
});

const Users = mongoose.model('Users', UserSchema, 'users');

module.exports = Users;