// import mongoose
const mongoose = require('mongoose');

// create a favorites schema
const favoritesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project'
        }
    ]
});

// create a favorites model
const Favorites = mongoose.model('Favorites', favoritesSchema);

// export the favorites model
module.exports = Favorites;
