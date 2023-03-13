const { response } = require("express");
const User = require('../models/user');
const Token = require('../models/token');
const sendEmail = require('../mailers/reset-password-mailer');
const crypto = require('crypto');
const queue = require('../config/kue');
const resetPasswordEmailWorker = require('../workers/reset_password_email_worker');
const env = require('../config/environment');

// encrypting the password using bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;


// Function to create a new user
module.exports.create = async function(req, res) {
    if (req.body.password != req.body.confirm_password) {
        req.flash('info', 'Password mismatch');
        return res.redirect('/');
    }

    let email = req.body.email.toLowerCase();

    User.findOne({email: email}, function(error, user) {
        if (error) {
            req.flash('info', 'Something went wrong please try again later');

            console.log("Error in finding user while signing up");
            return res.redirect('/');
        }

        // If user doesn't exist
        if (!user) {
            // Create new user
            const password = req.body.password;

            // Hashing the password
            bcrypt.genSalt(saltRounds).then((salt) => {
                bcrypt.hash(password, salt)
                .then((hash) => {
                    User.create({...req.body, email: email, password: hash}, function(error, user) {
                        if (error) {
                            console.log("Error in creating user while signing up");
                            return;
                        }
                        req.flash('success', 'Account created, please continue to Sign in!');
        
                        console.log('User created successfully');
                        return res.redirect('/');
                    })
                }).catch((error) => {
                    console.log("Error in hashing password");
                    return;
                });
            });
            
        } else {
            req.flash('info', 'User already exist!');
            // If user already exist
            return res.redirect('back');
        }
    })


}




// Function to sign in user using session 
module.exports.createSession = async function(req, res) {
    
    if (req.user) {
        req.flash('success', 'Logged in Successfully');
    } else {
        req.flash('error', 'Invalid Username/Password!');
    }

    return res.redirect('/');
}



// Function to sign out and destroy session
module.exports.destroySession = function(req, res) {
    
    req.logout(function(error) {
        if (error) {
            console.log("error signing out");
            req.flash('error', 'Something went wrong!');
            return;
        }
    });
    req.flash('success', 'Logged Out');
    return res.redirect('/');
    
}







// forgot / reset password function
module.exports.forgotPassword = async function(req, res) {
    try {

        const user = await User.findOne({ email: req.body.email.toLowerCase() });
        if (!user) {
            req.flash('warning', "User with given email doesnt exist");
            console.log('User with given email doesnt exist');
            return res.redirect('back');

        }

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `${env.password_link}${user._id}/${token.token} follow this link to reset your password.\nTeam NodeJs Authentication.`;
        // await sendEmail(user.email, "Password reset link", link);
        const data = {
            email: user.email,
            link: link
        }
        let job = queue.create('emails', data).save(function(error) {
            if (error) {
                console.log("Error in creatign a queue");
                return;
            }
            console.log(job.id);
        });

        req.flash('success', "Password reset link sent to your email account!");
        return res.redirect('/');
    } catch (error) {
        req.flash('warning', "An error occured, try again later!");
        return res.redirect('/');
    }
}




