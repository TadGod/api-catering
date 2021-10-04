const mongoose = require('mongoose');

const PostSchematic = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Inventory', PostSchematic);