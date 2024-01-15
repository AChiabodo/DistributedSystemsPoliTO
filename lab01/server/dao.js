'use strict';
/* Data Access Object (DAO) module for accessing questions and answers */

const sqlite = require('sqlite3');
const dayjs = require('dayjs');

// open the database
const db = new sqlite.Database('films.db', (err) => {
  if(err) throw err;
});

// get all films
exports.listFilms = (user) => {
  console.log(user);
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM films WHERE user = ?';
    db.all(sql, [user], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      console.log(rows);
      const films = rows.map((e) => ({ id: e.id, title: e.title, favorite: e.favorite, watchdate: dayjs(e.watchdate) ,  rating : e.rating , user : e.user }));
      resolve(films);
    });
  });
};

// get the film identified by {id}
exports.getFilm = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM films WHERE id=?';
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row == undefined) {
        resolve({error: 'Film not found.'});
      } else {
        console.log(row);
        const film = { id: row.id, title: row.title, favorite: row.favorite, watchdate: dayjs(row.watchdate) ,  rating : row.rating , user : row.user };
        resolve(film);
      }
    });
  });
};

// get all users
exports.listUsers = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users';

    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      const users = rows.map((e) => (
        {
          id: e.id,
          email: e.email,
          name: e.name,
        }));

      resolve(users);
    });
  });
};

// get all films to a given user
exports.listFilmsByUsers = (userID) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM films WHERE user = ?';

    db.all(sql, [userID], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      //console.log('rows: '+JSON.stringify(rows));
      const films = rows.map((e) => (
        { id: e.id, title: e.title, favorite: e.favorite, watchdate: dayjs(e.watchdate) ,  rating : e.rating , user : e.user }));

      //console.log('answers: '+JSON.stringify(answers));
      resolve(films);
    });
  });
};

// add a new film
exports.createFilm = (film) => {
  console.log(film)
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO films(title, favorite,  watchdate ,rating, user) VALUES(?, ?, ?, DATE(?), ?)';
    db.run(sql, [film.title, film.favorite,  film.watchdate, film.rating, film.user], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};

// update an existing answer
exports.updateFilm = (film,user) => {
  return new Promise((resolve, reject) => {
    console.log(film);
    const sql = 'UPDATE films SET title = ? , rating = ? , favorite = ? , watchdate = DATE(?) , user = ? WHERE id = ? and user = ?';
    db.run(sql, [film.title , film.rating , film.favorite , film.watchdate , film.user , film.id , user], function (err) {
      if (err) {
        console.log(err)
        reject(err);
        return;
      } else
        resolve(this.changes);  // return the number of affected rows
    });
  });
} 

// delete an existing film
exports.deleteFilm = (id,user) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM films WHERE id = ? and user = ?';
    db.run(sql, [id , user], function (err) {
      if (err) {
        reject(err);
        return;
      } else
        resolve(this.changes);  // return the number of affected rows
    });
  });
}

//update the rating of an existing film
exports.updateFilmRating = (filmId,newRating) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE films SET rating = ? WHERE id = ? ';
    db.run(sql, [newRating,filmId], function (err) {
      if (err) {
        reject(err);
        return;
      } else
        resolve(this.changes);  // return the number of affected rows
    });
  });
} 

//update the favorite of an existing film
exports.updateFavorite = (filmId,newFavorite) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE films SET favorite = ? WHERE id = ? ';
    db.run(sql, [newFavorite,filmId], function (err) {
      if (err) {
        reject(err);
        return;
      } else
        resolve(this.changes);  // return the number of affected rows
    });
  });
} 

//get unseen films
exports.getUnseen = (user) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM films WHERE (watchdate IS NULL or watchdate = '') and user = ? ";
    db.all(sql, [user], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const films = rows.map((e) => ({ id: e.id, title: e.title, favorite: e.favorite, watchdate: dayjs(e.watchdate) ,  rating : e.rating , user : e.user }));
      resolve(films);
    });
  })
}

exports.getBestRated = (user) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM films WHERE rating = 5 and user = ? ";
    db.all(sql, [user], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const films = rows.map((e) => ({ id: e.id, title: e.title, favorite: e.favorite, watchdate: dayjs(e.watchdate) ,  rating : e.rating , user : e.user }));
      resolve(films);
    });
  })
}

exports.getLastMonth = (user) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM films WHERE DATE(watchdate) >= datetime('now', '-1 month') and user = ? ";
    db.all(sql, [user], (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      const films = rows.map((e) => ({ id: e.id, title: e.title, favorite: e.favorite, watchdate: dayjs(e.watchdate) ,  rating : e.rating , user : e.user }));
      resolve(films);
    });
  })
}

exports.getFavorites = (user) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM films WHERE favorite = true and user = ? ";
    db.all(sql, [user], (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      const films = rows.map((e) => ({ id: e.id, title: e.title, favorite: e.favorite, watchdate: dayjs(e.watchdate) ,  rating : e.rating , user : e.user }));
      resolve(films);
    });
  })
}