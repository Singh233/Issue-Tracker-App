// import express
const express = require('express');
// import the router
const router = express.Router();
// import the controller
const newProjectController = require('../controllers/new_project_controller');


// define the route for the new project page
router.get('/', newProjectController.newProject);

// define the route for the create project page
router.post('/create-project', newProjectController.createProject);


// export the router
module.exports = router;