// import project schema
const Project = require('../models/project');

// controller for new project
module.exports.newProject = function(req, res){
    return res.render('new_project', {
        title: "New Project"
    });
}

// controller for create project
module.exports.createProject = async function(req, res){
    try{
        console.log('Request Body', req.body)
        let project = await Project.create({
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            visibility: req.body.visibility,
            user: req.user._id
        });
        if (req.xhr){
            return res.status(200).json({
                data: {
                    project: project
                },
                message: "Project Created!"
            });
        }
        req.flash('success', 'Project Created Successfully');
        return res.redirect('back');
    }catch(err){
        console.log('Error', err);
        return;
    }
}