const mongoose = require('mongoose');
const { Schema } = mongoose;

const StoriesSchema = new Schema({
    title: { type: String, required: true, trim: true }, 
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    taged_users: { type: String, required: true, trim: true }
});

const Stories = mongoose.model('Stories', StoriesSchema, 'stories');

module.exports = Stories;