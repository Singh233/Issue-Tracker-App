// import mongoose
const mongoose = require('mongoose');
// import project model
const Project = require('../models/project');
// import issue model
const Issue = require('../models/issue');
// import user model
const User = require('../models/user');
// import favorite model
const Favorites = require('../models/favorites');


// controller for getting all projects
exports.projects = async (req, res) => {
    try {
        // find favorites of the user
        const favorites = await Favorites.findOne({ user: req.user._id });
        // find all projects and populate the user and issues
        await Project.find({})
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
                projects: projects,
                favorites: favorites
            });
        }
        );

    } catch (error) {
        
    }
}