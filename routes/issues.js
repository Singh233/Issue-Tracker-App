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

// Route for searching all issue
router.get('/:id/:search', issueController.searchAll);

// Route for searching open issue
router.get('/:id/search/open', issueController.searchOpen);

// Route for searching closed issue
router.get('/:id/search/closed', issueController.searchClosed);

// Route for filtering issue by recent activity
router.get('/:id/:all/filter/recent', issueController.filterRecentActivity);
router.get('/:id/:open/filter/recent', issueController.filterRecentActivity);
router.get('/:id/:closed/filter/recent', issueController.filterRecentActivity);


// Route for filtering issue by oldest activity
router.get('/:id/:all/filter/old', issueController.filterOldestActivity);
router.get('/:id/:open/filter/old', issueController.filterOldestActivity);
router.get('/:id/:closed/filter/old', issueController.filterOldestActivity);

// Route for filtering issue by logged in author
router.get('/:id/:all/filter/author', issueController.filterLoggedInAuthor);
router.get('/:id/:open/filter/author', issueController.filterLoggedInAuthor);
router.get('/:id/:closed/filter/author', issueController.filterLoggedInAuthor);


// export router
module.exports = router;