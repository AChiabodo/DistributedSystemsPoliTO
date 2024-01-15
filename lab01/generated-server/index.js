'use strict';
const passport = require('passport'); // auth middleware
const path = require('path');
const http = require('http');
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session'); // enable sessions
var cors = require('cors');

/*** Set up Passport ***/
// set up the "username and password" login strategy
// by setting a function to verify username and password
passport.use(new LocalStrategy(
    function(username, password, done) {
      userDao.getUser(username, password).then((user) => {
        if (!user)
          return done(null, false, { message: 'Incorrect username and/or password.' });
          
        return done(null, user);
      })
    }
  ));

const oas3Tools = require('oas3-tools');
const serverPort = 8080;

// swaggerRouter configuration
const options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

const expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
const app = expressAppConfig.getApp();



/** Set up and enable Cross-Origin Resource Sharing (CORS) **/


var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};


/*** Passport ***/

passport.serializeUser(function (user, cb) { 
  cb(null, user);
});

passport.deserializeUser(function (user, cb) { 
  return cb(null, user); 
});


/*** Defining authentication verification middleware ***/

const isLoggedIn = (req, res, next) => {
if(req.isAuthenticated()) {
      return next();
  }
  return res.status(401).json({error: 'Not authorized'});
}

// Creating the session

app.use(cors(corsOptions));
// set up the session
app.use(session({
  // by default, Passport uses a MemoryStore to keep track of the sessions
  secret: 'wge8d239bwd93rkskb',   //personalize this random string, should be a secret value
  resave: false,
  saveUninitialized: false 
}));
app.use(passport.authenticate('session'));



const filmController = require(path.join(__dirname, './controllers/filmController.js'));
const authController = require(path.join(__dirname, './controllers/authController.js'));

app.get('/api/films/public', filmController.apiFilmsPublicGET);
app.get('/api/films/public/:filmId', filmController.apiFilmsPublicIdGET);
app.get('/api/films/public/:filmId/reviews', filmController.apiFilmsPublicFilmIdReviewsGET);
app.get('/api/films', isLoggedIn, filmController.apiFilmsGET);
app.delete('/api/films/:filmId', isLoggedIn, filmController.apiFilmsFilmIdDELETE);
app.get('/api/films/:filmId', isLoggedIn, filmController.apiFilmsFilmIdGET);
app.post('/api/films', isLoggedIn,  filmController.apiFilmsPOST);
app.post('/api/auth', authController.authenticateUser);
// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});