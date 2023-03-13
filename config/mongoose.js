const mongoose = require('mongoose');
const env = require('./environment');


// Connect to the Mongodb atlas(cloud) Database
mongoose.connect(env.db);

// Acquire the connection
const db = mongoose.connection;

// Error handling
db.on('error', console.error.bind(console, "Error connecting to db"));

// On Successfully connected
db.once('open', function() {
    console.log("Successfully connected to the database");
})