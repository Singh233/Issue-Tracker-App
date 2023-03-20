// import express
const express = require('express');
// import router
const router = express.Router();
// import project controller
const projectController = require('../controllers/projects_controller');


// route for getting all projects
router.get('/', projectController.projects);

// export router
module.exports = router;