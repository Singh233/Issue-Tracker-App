

// controller for new project
module.exports.newProject = function(req, res){
    return res.render('new_project', {
        title: "New Project"
    });
}