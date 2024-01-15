/**
 * All the API calls
 */

import { mapFromFilm, mapToFilm } from "./Film";

const URL = 'http://localhost:8080/api/';

async function getAllFilms() {
  const response = await fetch(URL+'films/public',{
    method: 'GET',
    credentials: 'include',});
  let data = await response.json();
  console.log(data);
  if (response.ok) {
    return data.map((e) => mapToFilm(e) )
  } else {
    throw data;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
  }
}

function getJson(httpResponsePromise) {
  // server API always return JSON, in case of error the format is the following { error: <message> }
  return new Promise((resolve, reject) => {
    httpResponsePromise
      .then((response) => {
        if (response.ok) {
          // the server always returns a JSON, even empty {}. Never null or non json, otherwise the method will fail
          response
            .json()
            .then((json) => resolve(json))
            .catch((err) => reject({ error: "Cannot parse server response : " + err }));
        } else {
          // analyzing the cause of error
          response
            .json()
            .then((obj) => reject(obj)) // error msg in the response body
            .catch((err) => reject({ error: "Cannot parse server response : " + err })); // something else
        }
      })
      .catch((err) => reject({ error: "Cannot communicate : " + err })); // connection error
  });
}

/**
 * Getting from the server side and returning the list of films.
 * The list of films could be filtered in the server-side through the optional parameter: filter.
 */
const getFilms = async (filter) => {
  const reqObj = {method: 'GET',credentials: 'include'};
  // film.watchDate could be null or a string in the format YYYY-MM-DD
  return getJson(
    filter
      ? fetch(URL + "films?filter=" + (filter ? filter : 'all') ,reqObj)
      : fetch(URL + "films",reqObj)
  ).then((json) => {
    return json.map((film) => mapToFilm(film));
  });
};

function addFilm(film) {
  // call  POST /api/answers
  return new Promise((resolve, reject) => {
    fetch(URL+`films`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.assign({}, mapFromFilm(film))),
    }).then((response) => {
      if (response.ok) {
        response.json()
          .then((id) => resolve(id))
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      } else {
        // analyze the cause of error
        response.json()
          .then((message) => { reject(message); }) // error message in the response body
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}

function updateFilm(film) {
  // call  PUT /api/answers/<id>
  return new Promise((resolve, reject) => {
    fetch(URL+`films/${film.id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.assign({}, mapFromFilm(film))),
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        // analyze the cause of error
        response.json()
          .then((message) => { reject(message); }) // error message in the response body
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}

function deleteFilm(film) {
  // call  DELETE /api/films/:id
  return new Promise((resolve, reject) => {
    fetch(URL+`films\\`+film.id, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.ok) {
        response.json()
          .then((numChanges) => resolve(numChanges))
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      } else {
        // analyze the cause of error
        response.json()
          .then((message) => { reject(message); }) // error message in the response body
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}

async function logIn(credentials) {
  let response = await fetch(URL + 'sessions', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (response.ok) {
    const user = await response.json();
    return user;
  } else {
    const errDetail = await response.json();
    throw errDetail.message;
  }
}

async function logOut() {
  await fetch(URL+'sessions/current', {
    method: 'DELETE', 
    credentials: 'include' 
  });
}

async function getUserInfo() {
  const response = await fetch(URL+'sessions/current', {
    credentials: 'include'
  });
  const userInfo = await response.json();
  if (response.ok) {
    return userInfo;
  } else {
    throw userInfo;  // an object with the error coming from the server
  }
}

const API = {getAllFilms , getFilms , addFilm , updateFilm , deleteFilm , getUserInfo , logIn , logOut};
export default API;