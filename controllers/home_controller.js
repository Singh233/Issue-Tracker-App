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