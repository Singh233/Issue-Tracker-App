// import express
const express = require('express');
// import router
const router = express.Router();
// import issue controller
const issueController = require('../controllers/issues_controller');



// define route for project issue page
router.get('/:id', issueController.issue);


// export router
module.exports = router;