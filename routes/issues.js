// import express
const express = require('express');
// import router
const router = express.Router();
// import issue controller
const issueController = require('../controllers/issues_controller');
// import comments controller
const commentsController = require('../controllers/comments_controller');



// define route for project issue page
router.get('/:id', issueController.issue);

// Route for new issue page
router.get('/:id/new', issueController.new);

// define route for creating issue
router.post('/:id/new/create', issueController.create);

// Route for discussion page
router.get('/:id/discussion/:index', issueController.discussion);

// define route for creating comment
router.post('/:id/discussion/:index/create-comment', commentsController.createComment);


// export router
module.exports = router;