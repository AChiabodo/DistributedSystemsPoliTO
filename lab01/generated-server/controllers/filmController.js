'use strict';

const utils = require('../utils/writer.js');
const sqlite = require('sqlite3');
const Film = require('../service/FilmsService.js')
// open the database
const db = require('../components/db');


module.exports.apiFilmsFilmIdDELETE = function apiFilmsFilmIdDELETE (req, res, next) {
  const id = req.params['filmId']
  const sql = 'DELETE FROM films WHERE id = ?';
  db.all(sql, [id], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log(rows)
    utils.writeJson(res, rows);
  });
  };
  
  module.exports.apiFilmsFilmIdGET = function apiFilmsFilmIdGET (req, res, next) {
    const id = req.params['filmId']
    const sql = 'SELECT * FROM films';
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      console.log(rows)
      utils.writeJson(res, rows);
    });
  };
  
  module.exports.apiFilmsFilmIdPUT = function apiFilmsFilmIdPUT (req, res, next, body) {
  const id = req.params['filmId']
  };
  
  module.exports.apiFilmsGET = function apiFilmsGET (req, res, next) {
  const sql = 'SELECT * FROM films';
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log(rows)
    utils.writeJson(res, rows);
  });
  };
  
  module.exports.apiFilmsPOST = function apiFilmsPOST (req, res, next) {
    console.log(req.body)
    const title = req.body['title'];
    const owner = req.body['owner'];
    const private_film = req.body['private'];
    const watchDate = req.body['watchDate'];
    const rating = req.body['rating'];
    const favorite = req.body['favorite'];
    
    const sql = 'INSERT INTO films(title, owner, private, watchDate, rating, favorite) VALUES(?,?,?,?,?,?)';
      db.run(sql, [title, owner, private_film, watchDate, rating, favorite], function(err) {
          if (err) {
              reject(err);
          } else {
              var createdFilm = new Film(this.lastID, title, owner, private_film, watchDate, rating, favorite);
              tils.writeJson(res, createdFilm);
          }
      });
  };
  
  module.exports.apiFilmsPublicFilmIdReviewsGET = function apiFilmsPublicFilmIdReviewsGET (req, res, next) {
    const id = req.params['filmId']
    console.log(id)
    const sql = 'SELECT * FROM reviews WHERE filmid = ?';
    db.all(sql, [id], (err, rows) => {
      if (err) {
        throw err;
      }
      console.log(rows)
      utils.writeJson(res, rows);
    });  
    
  };
  
  module.exports.apiFilmsPublicGET = function apiFilmsPublicGET (req, res, next) {
    const sql = 'SELECT * FROM films WHERE private = 0';
    Film.getPublicFilms()
    .then( (response)=> {
      utils.writeJson(res, response, 201);
    } )
    .catch( (response) => {
      utils.writeJson(res, { errors: [{ 'param': 'Server', 'msg': response }], }, 500);
    })
  };
  
  module.exports.apiFilmsPublicIdGET = function apiFilmsPublicIdGET (req, res, next) {
    const id = req.params['filmId']
    const sql = 'SELECT * FROM films WHERE private = 0 and id = ?';
    db.all(sql, [id], (err, rows) => {
      if (err) {
        throw err;
      }
      console.log(rows)
      utils.writeJson(res, rows);
    });
  };
  