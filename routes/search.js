// import express
const express = require('express');
// import router
const router = express.Router();
// import search controller
const searchController = require('../controllers/search_controller');


// search projects
router.get('/projects', searchController.searchProjects);


// export the router
module.exports = router;