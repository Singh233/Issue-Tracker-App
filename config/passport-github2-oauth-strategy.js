const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/user');
const crypto = require('crypto');
const env = require('./environment');





// Configure passport and Github auth strategy

passport.use(new GitHubStrategy({
    clientID: env.github_clientID,
    clientSecret: env.github_clientSecret,
    callbackURL: env.github_callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile);
        // find a user
        const email = profile.emails[0].value.toLowerCase();
        User.findOne({email: email}).exec(function(error, user) {
            if (error) {
                console.log('Error in Github strategy passport', error);
                return;
            }
            console.log(profile);
            if (user) {
                //if found set this user as req.user
                return done(null, user);
            }
            
            User.create({
                // if not found create the user and set it as req.user
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            }, function(error, user) {
                if (error) {
                    console.log("Error in creating user google auth", error);
                    return;
                }

                return done(null, user);
            })
        });
    }
));


module.exports = passport;