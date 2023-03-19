// import express
const express = require('express');
// import router
const router = express.Router();
// import issue controller
const issueController = require('../controllers/issues_controller');
// import comments controller
const commentsController = require('../controllers/comments_controller');



// define route for project all issues page
router.get('/:id/all', issueController.all);

// define route for project open issues page
router.get('/:id/open', issueController.open);

// define route for project closed issues page
router.get('/:id/closed', issueController.closed);

// Route for new issue page
router.get('/:id/new', issueController.new);

// define route for creating issue
router.post('/:id/new/create', issueController.create);

// Route for discussion page
router.get('/:id/discussion/:index', issueController.discussion);

// define route for creating comment
router.post('/:id/discussion/:index/create-comment', commentsController.createComment);

// Route for change status of issue
router.get('/:id/discussion/:index/:issueId/change-status/:status', issueController.changeStatus);


// export router
module.exports = router;