// import mongoose
const mongoose = require('mongoose');
// import project model
const Project = require('../models/project');
// import issue model
const Issue = require('../models/issue');
// import user model
const User = require('../models/user');


// controller for getting all projects
exports.projects = (req, res) => {
    try {
        // find all projects and populate the user and issues
        Project.find({})
        .populate('user')
        .populate('issues')
        .exec((err, projects) => {
            if (err) {
                console.log("Error in finding projects");
                return;
            }
            // return all projects
            return res.render('projects', {
                title: "Projects",
                projects: projects
            });
        }
        );

    } catch (error) {
        
    }
}