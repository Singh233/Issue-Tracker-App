


const development = {
    name: 'development',

    google_clientID: process.env.NODEJS_GOOGLE_CLIENT_ID,
    google_clientSecret: process.env.NODEJS_GOOGLE_CLIENT_SECRET,
    google_callbackURL: 'http://localhost:8000/users/auth/google/callback',
    
    github_clientID: process.env.NODEJS_GITHUB_CLIENT_ID,
    github_clientSecret: process.env.NODEJS_GITHUB_CLIENT_SECRET,
    github_callbackURL: "http://localhost:8000/users/auth/github/callback",

    fb_clientID: process.env.NODEJS_FACEBOOK_CLIENT_ID,
    fb_clientSecret: process.env.NODEJS_FACEBOOK_CLIENT_SECRET,
    fb_callbackURL: "http://localhost:8000/users/auth/facebook/callback",

    db: process.env.NODEJS_DB,
    password_link: 'http://localhost:8000/users/password-reset/',

    host: process.env.NODEJS_MAIL_HOST,
    user: process.env.NODEJS_MAIL_USER,
    pass: process.env.NODEJS_MAIL_PASS,
}

const production = {
    name: 'production',
    google_clientID: process.env.NODEJS_GOOGLE_CLIENT_ID,
    google_clientSecret: process.env.NODEJS_GOOGLE_CLIENT_SECRET,
    google_callbackURL: 'https://sanam.tech/users/auth/google/callback',
    
    github_clientID: process.env.NODEJS_GITHUB_CLIENT_ID,
    github_clientSecret: process.env.NODEJS_GITHUB_CLIENT_SECRET,
    github_callbackURL: "https://sanam.tech/users/auth/github/callback",

    fb_clientID: process.env.NODEJS_FACEBOOK_CLIENT_ID,
    fb_clientSecret: process.env.NODEJS_FACEBOOK_CLIENT_SECRET,
    fb_callbackURL: "https://sanam.tech/users/auth/facebook/callback",

    db: process.env.NODEJS_DB,
    password_link: 'https://sanam.tech/users/password-reset/',

    host: process.env.NODEJS_MAIL_HOST,
    user: process.env.NODEJS_MAIL_USER,
    pass: process.env.NODEJS_MAIL_PASS,

}

module.exports = development;