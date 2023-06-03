// import moment
const moment = require('moment');

module.exports.home = async function (req, res) {
    try {
        // find all the projects and populate the user of each project
        let projects = [];

        let favorites = [];
        if (req.user) {
            // import project model
            const Project = require('../models/project');
            // import favorites model
            const Favorites = require('../models/favorites');
            // find favorites of the user and populate the array of projects
            favorites = await Favorites.findOne({ user: req.user._id });
            projects = await Project.find({})
                .populate('user')
                .sort('-createdAt');
        }

        // // populate the projects of projects array
        // favorites.projects.forEach(project => {
        //     project.populate('projects');

        // });

        return res.render('home.ejs', {
            title: 'NodeJs Authentication',
            name: 'World!',
            projects,
            favorites,
            moment,
        });
    } catch (error) {
        console.log('Error', error);
        return res.render('home.ejs', {
            title: 'NodeJs Authentication',
            name: 'World!',
            projects: [],
            favorites: [],
            moment,
        });
    }
};

// controller for getting projects according to query
module.exports.getProjects = async function (req, res) {
    try {
        // import project model
        const Project = require('../models/project');
        // import favorites model
        const Favorites = require('../models/favorites');
        // find favorites of the user
        let favorites = await Favorites.findOne({ user: req.user._id });
        if (req.query.page === 'recent') {
            // find all the projects and populate the user of each project
            let projects = await Project.find({})
                .populate('user')
                .populate('issues')
                .sort('-createdAt');

            let time = [];
            projects.forEach((project) => {
                time.push(moment(project.createdAt).fromNow());
            });

            return res.json(200, {
                message: 'Projects fetched successfully',
                data: {
                    projects,
                    favorites,
                    time,
                },
            });
        } else if (req.query.page === 'user') {
            // find all the projects of logged in user and populate the user and issues of each project
            let projects = await Project.find({ user: req.user._id })
                .populate('user')
                .populate('issues')
                .sort('-createdAt');

            let time = [];
            projects.forEach((project) => {
                time.push(moment(project.createdAt).fromNow());
            });

            return res.json(200, {
                message: 'Projects fetched successfully',
                data: {
                    projects,
                    favorites,
                    time,
                },
            });
        } else if (req.query.page === 'starred') {
            // find all the projects of logged in user and populate the user and issues of each project
            let projects = [];
            let time = [];
            // populate the projects of projects array
            for (let i = 0; favorites && i < favorites.projects.length; i++) {
                let project = await Project.findById(favorites.projects[i])
                    .populate('user')
                    .populate('issues');
                projects.push(project);
                time.push(moment(project.createdAt).fromNow());
            }

            const data = {
                projects,
                favorites,
                time,
            };


            return res.json(200, {
                message: 'Projects fetched successfully',
                data,
            });
        }
    } catch (error) {
        console.log(error);
        return res.json(500, {
            message: 'Internal Server Error',
        });
    }
};
