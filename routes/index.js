const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');

console.log("Router loaded");

// Define a route for the home page
router.get('/', homeController.home);

// Route for sign/up page
router.use('/users', require('./users'));

// Route for new project page
router.use('/new-project', require('./new_project'));

// Route for project issue page
router.use('/issues', require('./issues'));

// Route for project page
router.use('/projects', require('./projects'));


module.exports = router;