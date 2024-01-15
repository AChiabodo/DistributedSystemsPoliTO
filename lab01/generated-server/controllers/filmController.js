'use strict';

const utils = require('../utils/writer.js');
const Default = require('../service/DefaultService');
const sqlite = require('sqlite3');

// open the database
const db = new sqlite.Database('databaseV1.db', (err) => {
  if(err) throw err;
});


module.exports.apiFilmsFilmIdDELETE = function apiFilmsFilmIdDELETE (req, res, next) {
  const id = req.params['filmId']
  };
  
  module.exports.apiFilmsFilmIdGET = function apiFilmsFilmIdGET (req, res, next) {
    const id = req.params['filmId']
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
  
  module.exports.apiFilmsPOST = function apiFilmsPOST (req, res, next, body) {
    Default.apiFilmsPOST(body)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };
  
  module.exports.apiFilmsPublicFilmIdReviewsGET = function apiFilmsPublicFilmIdReviewsGET (req, res, next, filmId) {
    const id = req.params['filmId']
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
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      console.log(rows)
      utils.writeJson(res, rows);
    });
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
  