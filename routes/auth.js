const express = require('express');
const router = express.Router();

// Imports bcrypt and jwt packages to be used down the line //
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validation/validation');


// Delete after completion  ! ! ! ! ! // 
router.get('/', (req, res) => {
    res.send('User tables');
})

// Enables ability to register a new user into database //
router.post('/register', async (req, res) => {

    // Check for validation more info on criteria in validation folder //
    const { error } = registerValidation(req.body);
    if (error) return res.send(error);

    try {

        // Looks through database to see if a username already exists, if so, returns an error, functionality stops here //
        const usernameTaken = await User.findOne({username: req.body.username});
        if (usernameTaken) return res.json('Username is already taken');

        // Encryption of a password for safety purposes //
        const salt = await bcrypt.genSalt(10);
        const hiddenPassword = await bcrypt.hash(req.body.password, salt);

        const user = await new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: hiddenPassword
        });

        const createUser = await user.save();
        res.json(createUser);
;
    } catch(err) {
        res.json(err);
    }
})

// Enables user to log into the system //
router.post('/login', async (req, res) => {

    // Check for validation more info on criteria in validation folder //
    const { error } = loginValidation(req.body);
    if (error) return res.json(error);

    // Looks through database to see if a username does not exist, if so, returns an error, functionality stops here //
    const user = await User.findOne({username: req.body.username});
    if (!user) return res.json({details: [{message: 'User does not exist'}]});

    // Decrypts the password using bcrypt package //
    const passwordDecrypt = await bcrypt.compare(req.body.password, user.password);
    if (!passwordDecrypt) return res.json({details: [{message: 'Password is incorrect'}]});

    // Generates a token using jwt package //
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_UNIQUE);
    res.header('token', token).json({token: token});
})

module.exports = router;