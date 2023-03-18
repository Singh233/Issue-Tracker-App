// import project model
const flash = require('flash');
const Project = require('../models/project');
// import issue model
const Issue = require('../models/issue');
// import comment model
const Comment = require('../models/comment');

// controller for project issue page
module.exports.issue = async function (req, res) {
    try {
        // find the project and populate with user and issues
        let project = await Project.findById(req.params.id).populate('user');

        // find the issues of the project and populate with user
        let issues = await Issue.find({ project: req.params.id }).populate('user');

        // render the project issue page
        return res.render('issues.ejs', {
            title: 'Issue',
            project: project,
            issues: issues,
        });
    } catch (error) {
        flash(error, 'Error in finding project in db');
        console.log('Error--', error);
        return res.redirect('back');
    }
};

// controller for new issue page
module.exports.new = async function (req, res) {
    try {
        // find the project
        let project = await Project.findById(req.params.id).populate('user');
        // render the new issue page
        return res.render('new_issue.ejs', {
            title: 'New Issue',
            project: project,
        });
    } catch (error) {
        flash(error, 'Error in finding project in db');
        console.log('Error--', error);
        return res.redirect('back');
    }
};

// controller for creating issue
module.exports.create = async function (req, res) {
    try {
        // find the project
        let project = await Project.findById(req.params.id);
        // create the issue
        let issue = await Issue.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            user: req.user._id,
            project: req.params.id,
        });
        // add the label to the issue
        issue.labels.push(req.body.label);
        issue.save();

        // add the issue to the project
        project.issues.push(issue);
        // save the project
        project.save();
        // flash message
        req.flash('success', 'Issue Created Successfully!');
        // redirect to project issue page
        return res.redirect('back');
    } catch (error) {
        req.flash('error', 'Error in creating issue');
        console.log('Error--', error);
        return res.redirect('back');
    }
};


// controller for showing discussion page
module.exports.discussion = async function (req, res) {
    try {
    

        // find the issue of the project and populate with user
        let issue = await Issue.findById(req.params.id).populate('user');

        // find the comments of the issue and populate with user
        let comments = await Comment.find({ issue: req.params.id }).populate('user');

        // find the project and populate with user
        let project = await Project.findById(issue.project).populate('user');

        // render the project issue page
        return res.render('discussion.ejs', {
            title: 'Discussion',
            issue,
            project,
            comments,
            index: req.params.index,
        });
    } catch (error) {
        flash(error, 'Error in finding project in db');
        console.log('Error--', error);
        return res.redirect('back');
    }
}
