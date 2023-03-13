const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');


// route to create a new user
router.post('/create', usersController.create);

// route to create new session on sign in using passport as middleware
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/'},
    
    
    
), usersController.createSession);


// route to sign out user
router.get('/sign-out', usersController.destroySession);


// route for google oAuth
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/',
    
}), usersController.createSession)


// route for facebook oAuth
router.get('/auth/facebook', passport.authenticate('facebook', {scope: ['public_profile', 'email']}));


router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/',
    
}), usersController.createSession)


// route for facebook oAuth
router.get('/auth/github', passport.authenticate('github', {scope: ['user:email']}));


router.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/',
}), usersController.createSession)


router.post('/forgot-password', usersController.forgotPassword);


// router.get("/reset-password/:userId/:token", usersController.resetPassword);


module.exports = router;