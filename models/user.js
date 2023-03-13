const mongoose = require('mongoose');


// Creating user schema
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true},
    password: { type: String},
    name: { type: String, required: true},
    facebook_id: {type: String} // for facebook auth
}, {
    timestamps: true
});


const User = mongoose.model('User', userSchema);

module.exports = User;