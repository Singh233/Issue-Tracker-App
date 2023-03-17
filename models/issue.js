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
    label: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Open'
    },
    author: {
        type: String,
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }
}, {
    timestamps: true
});
