const express = require('express');
const router = express.Router();
const passport = require('../config/passport-local-strategy');

const homeController = require('../controllers/home_controller');

console.log("Router loaded");

// Define a route for the home page
router.get('/', homeController.home);

// Route for home navigation
router.use('/nav', passport.checkAuthentication, homeController.getProjects);

// Route for sign/up page
router.use('/users', require('./users'));

// Route for new project page
router.use('/new-project', passport.checkAuthentication, require('./new_project'));

// Route for project issue page
router.use('/issues', passport.checkAuthentication, require('./issues'));

// Route for project page and middleware to check if user is logged in
router.use('/projects', passport.checkAuthentication, require('./projects'));

// Route for favorites page
router.use('/favorites', passport.checkAuthentication, require('./favorites'));

// Route for search page
router.use('/search', passport.checkAuthentication, require('./search'));


module.exports = router;