const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');
const path = require('path');
const routes = require('./routes');
const passwordReset = require('./routes/passwordReset');
const bodyParser = require('body-parser');

// For session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const passportFacebook = require('./config/passport-facebook-oauth-strategy');
const passportGithub = require('./config/passport-github2-oauth-strategy');
const MongoStore = require('connect-mongo');

// add db
const db = require('./config/mongoose');

const flash = require('connect-flash');
const customWare = require('./config/middleware');

app.use(express.urlencoded({extended: true})); // parses urlencoded bodie

// compile scss to css
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: false,
    outputStyle: 'extended',
    prefix: '/css'
}));



app.use(express.static('./assets'));

// Tell express to use layouts in all views
app.use(expressLayouts);

// extracct style and scripts from sub pages int the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// set up express app to use EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', './views');

// configure express-session and mongo store is used to store the session cookie in the db
app.use(session({
    name: 'Authentication',
    secret: 'something',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100),
    },
    store: MongoStore.create(
        {
            mongoUrl: `mongodb+srv://sanam:${process.env.MONGODB_CLUSTER_PASSWORD}@cluster0.pxkvrhv.mongodb.net/?retryWrites=true&w=majority`,
            autoRemove: 'disabled'
        },
        function(error) {
            console.log(error || "---connect-mongodb setup ok---")
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customWare.setFlash);

// use express router
app.use('/', routes);
app.use("/users/password-reset", passwordReset);

app.listen(port, (error) => {
    if (error) {
        console.log('Error in starting the server', error);
        return;
    }
    console.log(`Server is running: http://localhost:${port}`);
})