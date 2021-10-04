const mongoose = require('mongoose');

const UserSchematic = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'user'
    }
})

module.exports = mongoose.model('User', UserSchematic);