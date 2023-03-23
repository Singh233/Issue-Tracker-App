// import project model
const Project = require('../models/project');
// import user model
const User = require('../models/user');
// import issue model
const Issue = require('../models/issue');
// import comment model
const Comment = require('../models/comment');
// import favorite model
const Favorites = require('../models/favorites');


// search projects
module.exports.searchProjects = async function (req, res) {
    try {
        // get the search value
        const searchValue = req.query.value;
        // get the projects
        const projects = await Project.find({ title: { $regex: searchValue, $options: 'i' } }).populate('user');

        // find favorites of the user and populate the array of projects
        let favorites = await Favorites.findOne({ user: req.user._id });

        if (req.xhr) {
            // return the response
            return res.status(200).json({
                message: 'Projects found',
                data: {
                    projects: projects,
                    favorites: favorites
                }
            });
        } else {
            // return the response
            return res.render('search', {
                title: 'Search',    
                projects: projects,
                favorites: favorites,
                searchValue: searchValue
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}