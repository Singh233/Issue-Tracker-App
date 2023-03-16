const mongoose = require('mongoose');

// Creating user schema
const userSchema = new mongoose.Schema(
    {
        email: { type: String, unique: true },
        password: { type: String },
        name: { type: String, required: true },
        avatar: {
            type: String,
            default:
                'https://res.cloudinary.com/dzqjxjx8f/image/upload/v1583991009/avatars/default-avatar.png',
        },
        facebook_id: { type: String }, // for facebook auth
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
