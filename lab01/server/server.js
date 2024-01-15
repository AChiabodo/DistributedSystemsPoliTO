'use strict';

const express = require('express');
const morgan = require('morgan'); // logging middleware
const {check, validationResult} = require('express-validator'); // validation middleware
const dao = require('./dao'); // module for accessing the DB
const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session'); // enable sessions
const userDao = require('./user-dao'); // module for accessing the user info in the DB
const cors = require('cors');


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

// serialize and de-serialize the user (user object <-> session)
// we serialize the user id and we store it in the session: the session is very small in this way
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((id, done) => {
  userDao.getUserById(id)
    .then(user => {
      done(null, user); // this will be available in req.user
    }).catch(err => {
      done(err, null);
    });
});

// init express
const app = express();
const port = 3022;

// set-up the middlewares
app.use(morgan('dev'));
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));

// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
//  console.log(req.isAuthenticated())
  if(req.isAuthenticated())
    return next();
  
  return res.status(401).json({ error: 'Not authenticated'});
}

// set up the session
app.use(session({
  // by default, Passport uses a MemoryStore to keep track of the sessions
  secret: 'wge8d239bwd93rkskb',   //personalize this random string, should be a secret value
  resave: false,
  saveUninitialized: false 
}));

// then, init passport
app.use(passport.initialize());
app.use(passport.session());

/*** APIs ***/

//GET /api/films
app.get('/api/films',isLoggedIn, (req, res) => {
  let filterFunction = dao.listFilms;
  if (req.query.filter){
  switch (req.query.filter){
    case "unseen":
      filterFunction = dao.getUnseen;
      break;
    case "lastmonth":
      filterFunction = dao.getLastMonth
      break;
    case "favorites":
      filterFunction = dao.getFavorites
      break;
    case "bestrated":
      filterFunction = dao.getBestRated
      break;
    case "all":
      break;
    default:
      res.status(404).json({ error: `Invalid filter ${req.query.filter}` });
      return;
  }}
  console.log("User : " + req.user.id);
  filterFunction(req.user.id)
  .then(films => res.json(films))
  .catch(() => res.status(500).end());
});

// GET /api/questions/<id>
app.get('/api/films/:id',isLoggedIn, async (req, res) => {
  try {
    const result = await dao.getFilm(req.params.id);
    if(result.error)
      res.status(404).json(result);
    else
      res.json(result);
  } catch(err) {
    res.status(500).end();
  }
});

// GET /api/users
app.get('/api/users',isLoggedIn,async (req, res) => {
  try {
    const users = await dao.listUsers();
    res.json(users);
  } catch(err) {
    res.status(500).end();
  }
});

// GET /api/users/<id>
app.get('/api/users/:id',isLoggedIn, async (req, res) => {
  try {
    const result = await userDao.getUser(req.params.id);
    if(result.error)
      res.status(404).json(result);
    else
      res.json(result);
  } catch(err) {
    res.status(500).end();
  }
});


// POST /api/films
app.post('/api/films',isLoggedIn,[
  check('title').isLength({min:1}),
  check('favorite').isBoolean(),
  check('user').isInt(),   // as an example
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors});
  }

  const user = req.body.user;
  const e = req.body;
  const resultUser = await userDao.getUser(user);  // needed to ensure db consistency
  if (resultUser.error)
    res.status(404).json(resultUser);   // questionId does not exist, please insert the question before the answer
  else {
    const film = { id: e.id, title: e.title, favorite: e.favorite, watchdate: e.watchdate ,  rating : e.rating , user : e.user };
    try {
      const filmId = await dao.createFilm(film);
      // Return the newly created id of the question to the caller. 
      // A more complex object can also be returned (e.g., the original one with the newly created id)
      res.status(201).json(filmId);
    } catch (err) {
      res.status(503).json({ error: `Database error during the creation of answer ${film.title} by user : ${film.user}.` });
    }
  }
});

//PUT /api/films/:id/rating
app.put('/api/films/:id/rating',isLoggedIn, [
  check('rating').isInt(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }
  try{
    let id = parseInt(req.params.id);
    let newRating = parseInt(req.body.rating);
    const numRowChanges = await dao.updateFilmRating(id,newRating)
    res.json(numRowChanges);
  }catch{
    res.status(503).json({error: `Database error during the update of the rating of film ${req.params.id}.`});
  }
});

//PUT /api/films/:id/favorite
app.put('/api/films/:id/favorite',isLoggedIn, [
  check('favorite').isBoolean(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }
  try{
    let id = parseInt(req.params.id);
    let newFavorite = req.body.favorite;
    const numRowChanges = await dao.updateFavorite(id,newFavorite)
    res.json(numRowChanges);
  }catch{
    res.status(503).json({error: `Database error during the update of favorite by film ${req.params.id}.`});
  }
});

//PUT /api/films/<id>
app.put('/api/films/:id',isLoggedIn, [
  check('title').isLength({min:1}),
  check('id').isInt(),
  check('user').isInt(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  const film = req.body;
  // you can also check here if the id passed in the URL matches with the id in req.body,
  // and decide which one must prevail, or return an error
  if (parseInt(film.id) != parseInt(req.params.id)){
    res.status(422).json({error: `Database error during the update of film ${req.params.id} : invalid ID.`});
    return;
  };

  try {
    const numRowChanges = await dao.updateFilm(film,req.user.id);
    res.json(numRowChanges);
    //res.status(200).end();
  } catch(err) {
    res.status(503).json({error: `Database error during the update of film ${req.params.id}.`});
  }
});

// DELETE /api/films/<id>
app.delete('/api/films/:id', async (req, res) => {
  try {
    const numRowChanges = await dao.deleteFilm(req.params.id , req.user.id);  
    // number of changed rows is sent to client as an indicator of success
    res.json(numRowChanges);
  } catch(err) {
    console.log(err);
    res.status(503).json({ error: `Database error during the deletion of film ${req.params.id}.`});
  }
});

/*** Users APIs ***/
// GET /sessions/current
// check whether the user is logged in or not
app.get('/api/sessions/current', (req, res) => {  if(req.isAuthenticated()) {
  res.status(200).json(req.user);}
else
  res.status(401).json({error: 'Unauthenticated user!'});;
});

// DELETE /sessions/current 
// logout
app.delete('/api/sessions/current', (req, res) => {
  req.logout( ()=> { res.end(); } );
});

// POST /sessions 
// login
app.post('/api/sessions', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
      if (!user) {
        // display wrong login messages
        return res.status(401).json(info);
      }
      // success, perform the login
      req.login(user, (err) => {
        if (err)
          return next(err);
        
        // req.user contains the authenticated user, we send all the user info back
        // this is coming from userDao.getUser()
        return res.json(req.user);
      });
  })(req, res, next);
});


// Activate the server
app.listen(port, () => {
  console.log(`react-films-server listening at http://localhost:${port}`);
});