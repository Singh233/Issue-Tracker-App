const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/user');
const crypto = require('crypto');





// Configure passport and twitter auth strategy

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, cb) {
        User.findOrCreate({ twitterId: profile.id }, function (err, user) {
        return cb(err, user);
        });
    }
));


module.exports = passport;