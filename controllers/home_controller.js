// import project model
const Project = require('../models/project');





module.exports.home = async function(req, res) {

    // find all the projects and populate the user of each project
    let projects = await Project.find({}).populate('user').sort('-createdAt');
    
    return res.render('home.ejs', {
        title: 'NodeJs Authentication',
        name: 'World!',
        projects,
    })
}

// controller for getting projects according to query
module.exports.getProjects = async function(req, res) {
    console.log(req.query);
    try {
        if (req.query.page === 'recent') {
            // find all the projects and populate the user of each project
            let projects = await Project.find({}).populate('user').populate('issues').sort('-createdAt');
            return res.json(200, {
                message: 'Projects fetched successfully',
                data: {
                    projects
                }
            })
        } else if (req.query.page === 'user') {
            // find all the projects of logged in user and populate the user and issues of each project
            let projects = await Project.find({user: req.user._id}).populate('user').populate('issues').sort('-createdAt');
            console.log(projects)
            return res.json(200, {
                message: 'Projects fetched successfully',
                data: {
                    projects
                }
            })
        } else if (req.query.page === 'starred') {
            // find all the projects of logged in user and populate the user and issues of each project
            let projects = await Project.find({user: req.user._id}).populate('user').populate('issues').sort('-createdAt');
            return res.json(200, {
                message: 'Projects fetched successfully',
                data: {
                    projects
                }
            })
        }   
    } catch (error) {
        
    }
}