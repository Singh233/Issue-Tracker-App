// import project model
const flash = require('flash');
const Project = require('../models/project');
// import issue model
const Issue = require('../models/issue');
// import comment model
const Comment = require('../models/comment');

// controller for project all issues page
module.exports.all = async function (req, res) {
    try {
        // find the project and populate with user and issues
        let project = await Project.findById(req.params.id).populate('user');

        // find the issues of the project and populate with user
        let issues = await Issue.find({ project: req.params.id }).populate('user');

        if (req.xhr) {
            return res.status(200).json({
                data: {
                    issues: issues,
                },
                message: 'Issues fetched',
            });
        }

        // render the project issue page
        return res.render('issues.ejs', {
            title: 'Issue',
            project: project,
            issues: issues,
            page: 'all',
        });
    } catch (error) {
        flash(error, 'Error in finding project in db');
        console.log('Error--', error);
        return res.redirect('back');
    }
};

// controller for project open issues page
module.exports.open = async function (req, res) {
    try {
        // find the project and populate with user and issues
        let project = await Project.findById(req.params.id).populate('user');

        // find the issues of the project and populate with user
        let issues = await Issue.find({ project: req.params.id, status: 'open' }).populate('user');

        // render the project issue page
        return res.render('issues.ejs', {
            title: 'Issue',
            project: project,
            issues: issues,
            page: 'open',
        });
    } catch (error) {
        flash(error, 'Error in finding project in db');
        console.log('Error--', error);
        return res.redirect('back');
    }
};

// controller for project closed issues page
module.exports.closed = async function (req, res) {
    try {
        // find the project and populate with user and issues
        let project = await Project.findById(req.params.id).populate('user');

        // find the issues of the project and populate with user
        let issues = await Issue.find({ project: req.params.id, status: 'close' }).populate('user');

        // render the project issue page
        return res.render('issues.ejs', {
            title: 'Issue',
            project: project,
            issues: issues,
            page: 'closed',
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


// controller for changing status of issue
module.exports.changeStatus = async function (req, res) {
    try {
        // find the issue
        let issue = await Issue.findById(req.params.issueId);
        // change the status
        issue.status = req.params.status;
        // save the issue
        issue.save();

        if (req.params.status == 'close') {
            // flash message
            req.flash('success', 'Issue Closed!');
        } else {
            // flash message
            req.flash('success', 'Issue Reopened!');
        }

        // redirect to project issue page
        return res.redirect('back');
    } catch (error) {
        req.flash('error', 'Error in changing status');
        console.log('Error--', error);
        return res.redirect('back');
    }
}

// controller for searching issue
module.exports.search = async function (req, res) {
    try {
        // find the project and populate with user and issues
        let project = await Project.findById(req.params.id).populate('user');


        // find the issues of the project by title, user, label and populate with user
        let issues = await Issue.find({
            project: req.params.id,
            title: { $regex: req.query.search, $options: 'i' },
        }).populate('user');

        // find all issues
        let issues1 = await Issue.find({ project: req.params.id }).populate('user');
        // filter the issues by user
        issues1 = issues1.filter((issue) => {
            return issue.user.name.toLowerCase().includes(req.query.search.toLowerCase());
        });


        // find the issues of the project by title, user, label and populate with user
        let issues2 = await Issue.find({
            project: req.params.id,
            labels: { $regex: req.query.search, $options: 'i' },
        }).populate('user');

        // merge the issues
        issues = issues.concat(issues1);
        issues = issues.concat(issues2);

        // remove the duplicate issues
        issues = issues.filter((issue, index) => {
            return issues.indexOf(issue) === index;
        });


        // ajax request
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    issues: issues,
                },
                message: 'Issues fetched',
            });
        }

        // render the project issue page
        return res.render('issues.ejs', {
            title: 'Issue',
            project: project,
            issues: issues,
            page: 'all',
        });
    } catch (error) {
        flash(error, 'Error in finding project in db');
        console.log('Error--', error);
        return res.redirect('back');
    }
}
