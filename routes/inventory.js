// Booting up express //
const express = require('express');
const router = express.Router();
// Importing Post model //
const Post = require('../models/Post');
// Importing verificiation //
const verify = require('../validation/tokenValidation');


// Gets all items within inventory database //
router.get('/', async (req, res) => {
    try {
        
        const inventory = await Post.find();
        res.json(inventory);

    } catch(err) {
        res.json({message: err});
    }
})

// Get a specific item tracked down by id //
router.get('/:itemId', async (req, res) => {
    try {

        const item = await Post.findById(req.params.itemId);
        res.json(item);

    } catch(err) {
        res.json(err);
    }
});


// Enables ability to submit an item into database if user has status to do so //
router.post('/', verify, async (req, res) => {
    try {

        const post = await new Post({
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            photo: req.body.photo,
            price: req.body.price
        });
    
        const savedPost = await post.save();
        res.json(savedPost);

    } catch(err) {
        res.json({message: err});
    }
})

// Enables ability to update a certain item tracked down my id if user has status to do so //
router.patch('/:itemId', verify, async (req, res) => {
    try {

        const updatedItem = await Post.updateOne({ _id: req.params.itemId }, {$set: {
            title: req.body.title,
            description: req.body.description,
            photo: req.body.photo,
            price: req.body.price
        }});
        
        res.json(updatedItem);

    } catch(err) { 
        res.json({message: err});
    }
})

module.exports = router;