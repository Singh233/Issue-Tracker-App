// import mongoose
const mongoose = require('mongoose');

// create Issue schema

const IssueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    labels: [
        {
            type: String
        }
    ],
    status: {
        type: String,
        default: 'Open'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }
}, {
    timestamps: true
});

// export Issue model
module.exports = mongoose.model('Issue', IssueSchema);
