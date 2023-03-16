// import mongoose
const mongoose = require('mongoose');

// create new project schema
const ProjectSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        type: { type: String, required: true },
        visibility: { type: String, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    },
    {
        timestamps: true,
    }
);

// export new project schema
const Project = mongoose.model('Projects', ProjectSchema);

module.exports = Project;

