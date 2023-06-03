// import comments model
const flash = require('flash');
const Comment = require('../models/comment');
// import issue model
const Issue = require('../models/issue');

// controller for creating a new comment
module.exports.createComment = function (req, res) {
    try {
        // create a new comment
        let comment = Comment.create(
            {
                content: req.body.content,
                user: req.user._id,
                issue: req.body.issue_id,
            },
            function (err, comment) {
                if (err) {
                    console.log('error in creating a comment', err);
                    return;
                }
                // find the issue and add the comment to it
                Issue.findById(req.body.issue_id, function (err, issue) {
                    if (err) {
                        console.log('error in finding the issue');
                        return;
                    }
                    issue.comments.push(comment);
                    issue.save();
                });
                req.flash('success', 'Comment added!');

                // find the user of the comment
                comment.populate('user', function (err, comment) {
                    if (err) {
                        console.log('error in populating the user of the comment');
                        return;
                    }
                    // if the request is an ajax request, then return the comment
                    if (req.xhr) {
                        return res.status(200).json({
                            data: {
                                comment: comment,
                            },
                            message: 'Comment added!',
                        });
                    }
                    // if the request is not an ajax request, then redirect to the discussion page
                    return res.redirect('back');

                });
                
                
                
            }
        );
    } catch (error) {
        console.log('Error', error);
        req.flash('error', error);
        return res.redirect('back');
    }
};
