// import mongoose
const mongoose = require('mongoose');

// create Comment schema
const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    issue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Issue'
    },
    type: {
        type: String,
        enum: ['comment', 'event'],
        default: 'comment'
    }
}, {
    timestamps: true
});

// export Comment model
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;