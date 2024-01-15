'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local');
var utils = require('../utils/writer.js');
var Users = require('../service/UsersService');


// Set up local strategy to verify, search in the DB a user with a matching password, and retrieve its information by userDao.getUser (i.e., id, username, name).
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async function verify(username, password, done) {
  Users.getUserByEmail(username)
          .then((user) => {
              if (user === undefined) {
                return done(null, false, { message: 'Unauthorized access.' });
              } else {
                  if (!Users.checkPassword(user, password)) {
                    return done(null, false, { message: 'Unauthorized access.' });
                  } else {
                      return done(null, user);
                  }
              }
          }).catch(err => done(err));
}));

module.exports.logoutUser = function logoutUser(req, res, next) {

    if(!req.isAuthenticated()){
      res.status(401).json({error: 'Not authorized'});
    } else {
      const email = req.user.email;
      Users.getUserByEmail(email)
          .then((user) => {
              if (user === undefined) {
                  utils.writeJson(res, {errors: [{ 'param': 'Server', 'msg': 'Unauthorized access.' }],}, 401);
              } else {

                req.logout(() => {
                  res.status(200).json({});
                });
                }
              })
    }
  }

module.exports.authenticateUser = function authenticateUser (req, res, next) {

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
        return res.json({ id: user.id, name: user.name, email: req.body.email});
        
      });
    })(req, res, next);

};