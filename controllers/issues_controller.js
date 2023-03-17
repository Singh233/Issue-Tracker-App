// import project model
const flash = require('flash');
const Project = require('../models/project');


// controller for project issue page
module.exports.issue = async function(req, res) {
    try {
        // find the project and populate with user and issue
        let project = await Project.findById(req.params.id).populate('user');
        // render the project issue page
        return res.render('issues.ejs', {
            title: 'Issue',
            project: project
        });
        
    } catch (error) {
        flash(error, 'Error in finding project in db');
        console.log('Error--', error);
        return res.redirect('back');
    }
    
}