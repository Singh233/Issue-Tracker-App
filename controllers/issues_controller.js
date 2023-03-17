// import project model
const flash = require('flash');
const Project = require('../models/project');
// import issue model
const Issue = require('../models/issue');


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

// controller for new issue page
module.exports.new = async function(req, res) {
    try {
        // find the project
        let project = await Project.findById(req.params.id);
        // render the new issue page
        return res.render('new_issue.ejs', {
            title: 'New Issue',
            project: project
        });
    } catch (error) {
        flash(error, 'Error in finding project in db');
        console.log('Error--', error);
        return res.redirect('back');
    }

}


// controller for creating issue
module.exports.create = async function(req, res) {
    try {
        // find the project
        let project = await Project.findById(req.params.id);
        // create the issue
        let issue = await Issue.create({
            title: req.body.title,
            description: req.body.description,
            label: req.body.label,
            status: req.body.status,
            author: req.user._id,
            project: req.params.id
        });
        // add the issue to the project
        project.issues.push(issue);
        // save the project
        project.save();
        // flash message
        flash(success, 'Issue created successfully');
        // redirect to project issue page
        return res.redirect('back');
    } catch (error) {
        flash(error, 'Error in creating issue');
        console.log('Error--', error);
        return res.redirect('back');
    }

}
