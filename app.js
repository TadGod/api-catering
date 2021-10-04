// Booting up API with the help of express package //
const express = require('express');
const app = express();

// Requires .env package, hides sensitive information in a different file //
require('dotenv/config');

// Booting up body-parser package which converts data into JSON format //
// Applying middleware for body-parser to run every time app is used //
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Imported CORS package so api could be accessed by others //
const cors = require('cors');
app.use(cors());

// Booting up database //
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_CONNECTION, () => {
    console.log('trying to establish connection');
})

// Importing routes from different folders and applying middleware to it //

// Routes related to inventory //
const inventoryRoutes = require('./routes/inventory');
app.use('/inventory', inventoryRoutes);

// Routes related to authentificaiton / user creation and such //
const authRoutes = require('./routes/auth');
app.use('/user', authRoutes)

// Default route and text for API starting page //
app.get('/', (req, res) => {
    res.send('GET - /inventory, POST - /inventory, PATCH - /inventory, -POST - /user/register, -POST /user/login');
})

// Selects which port you want to put the server on //
app.listen(3001);