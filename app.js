const express = require('express');
const app = express();
const session = require('express-session');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '942927454959-gd7jf1ou629c5b6omieetf358sg8fu8q.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
app.set('view engine','ejs');

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
}));

app.get('/', function(req,res){
    res.render('login.ejs');
});


/* Passport Setup */
const passport = require('passport');
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.get('/success', (req,res) => res.send(userProfile));
app.get('/error', (req,res) => res.send("error logging in"));

passport.serializeUser( function(user, cb){
    cb(null, user)
});

passport.deserializeUser( function(user, cb){
    cb(null,  ob)
});



/* Google Auth*/
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
},
    function(accessToken, refreshToken, profile, done) {
        userProfile = profile;
        return done(null, userProfile);
    }
));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/error' }),
function(req, res) {
    // For successful authentication
        res.redirect('/success');
    }
    );

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log('App listening on port ' + port));