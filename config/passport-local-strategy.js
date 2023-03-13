const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// encrypting the password using bcrypt
const bcrypt = require('bcrypt');


// Authentication using passport
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passReqToCallback: true,
        },
        function (req, email, password, done) {
            // Find a user and establish the identity
            email = email.toLowerCase();
            console.log(email);

            User.findOne({ email: email }, function (error, user) {
                if (error) {
                    console.log('Error in finding user --> Passport');
                    return done(error);
                }

                if (!user) {
                    req.flash('error', 'Invalid Username/Password!');
                    console.log('Invalid username/password');
                    return done(null, false);
                }

                // Load hash from database for the password.
                bcrypt.compare(password, user.password)
                .then(result => {
                    console.log(result);
                    // This will be either true or false, based on if the string
                    // matches or not.
                    if (result) {
                        return done(null, user);
                    }
                    req.flash('error', 'Invalid Username/Password!');
                    console.log('Invalid username/password');
                    return done(null, false);
                }).catch((error) => {
                    console.log("Error in hashing password");
                    return;
                });
                

                
            });
        }
    )
);

// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
    User.findById(id, function (error, user) {
        if (error) {
            console.log('Error in finding user --> Passport');
            return done(error);
        }

        return done(null, user);
    });
});

// check if the user is authenticated

passport.checkAuthentication = function (req, res, next) {
    // if the user is signed in then pass on the request to the next function(controllers action)
    if (req.isAuthenticated) {
        return next();
    }

    // if the user is not signed in
    return res.redirect('/');
};

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains the current signed in user form the session cookie and we are just sending
        //this to the locals for the views
        res.locals.user = req.user;
    }
    next();
};

module.exports = passport;
