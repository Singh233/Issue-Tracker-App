


const development = {
    name: 'development',
    asset_path: './assets',
    google_clientID: process.env.ISSUE_TRACKER_GOOGLE_CLIENT_ID,
    google_clientSecret: process.env.ISSUE_TRACKER_GOOGLE_CLIENT_SECRET,
    google_callbackURL: 'http://localhost:8000/users/auth/google/callback',
    
    github_clientID: process.env.ISSUE_TRACKER_GITHUB_CLIENT_ID,
    github_clientSecret: process.env.ISSUE_TRACKER_GITHUB_CLIENT_SECRET,
    github_callbackURL: "http://localhost:8000/users/auth/github/callback",

    fb_clientID: process.env.ISSUE_TRACKER_FACEBOOK_CLIENT_ID,
    fb_clientSecret: process.env.ISSUE_TRACKER_FACEBOOK_CLIENT_SECRET,
    fb_callbackURL: "http://localhost:8000/users/auth/facebook/callback",

    db: process.env.ISSUE_TRACKER_DB,
    password_link: 'http://localhost:8000/users/password-reset/',

    host: process.env.NODEJS_MAIL_HOST,
    user: process.env.NODEJS_MAIL_USER,
    pass: process.env.NODEJS_MAIL_PASS,
}

const production = {
    name: 'production',
    asset_path: './public/assets',
    google_clientID: process.env.ISSUE_TRACKER_GOOGLE_CLIENT_ID,
    google_clientSecret: process.env.ISSUE_TRACKER_GOOGLE_CLIENT_SECRET,
    google_callbackURL: 'https://issuetracker.sanam.tech/users/auth/google/callback',
    
    github_clientID: process.env.ISSUE_TRACKER_GITHUB_CLIENT_ID,
    github_clientSecret: process.env.ISSUE_TRACKER_GITHUB_CLIENT_SECRET,
    github_callbackURL: "https://issuetracker.sanam.tech/users/auth/github/callback",

    fb_clientID: process.env.ISSUE_TRACKER_FACEBOOK_CLIENT_ID,
    fb_clientSecret: process.env.ISSUE_TRACKER_FACEBOOK_CLIENT_SECRET,
    fb_callbackURL: "https://issuetracker.sanam.tech/users/auth/facebook/callback",

    db: process.env.ISSUE_TRACKER_DB,
    password_link: 'https://issuetracker.sanam.tech/users/password-reset/',

    host: process.env.NODEJS_MAIL_HOST,
    user: process.env.NODEJS_MAIL_USER,
    pass: process.env.NODEJS_MAIL_PASS,

}

module.exports = production;