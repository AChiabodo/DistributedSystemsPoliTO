'use strict';


/**
 * logout
 * logout
 *
 * no response value expected for this operation
 **/
exports.apiAuthDELETE = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * get current session
 * get current session
 *
 * returns auth
 **/
exports.apiAuthGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "user" : {
    "password" : "password",
    "name" : "name",
    "id" : "id",
    "email" : "email"
  },
  "token" : "token"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Login
 * Login
 *
 * body User 
 * returns auth
 **/
exports.apiAuthPOST = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "user" : {
    "password" : "password",
    "name" : "name",
    "id" : "id",
    "email" : "email"
  },
  "token" : "token"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete a film by id
 * Delete a film by id
 *
 * filmId String The id of the film to delete
 * no response value expected for this operation
 **/
exports.apiFilmsFilmIdDELETE = function(filmId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get a film by id
 * Get a film by id
 *
 * filmId String The id of the film to retrieve
 * returns film
 **/
exports.apiFilmsFilmIdGET = function(filmId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "owner" : {
    "password" : "password",
    "name" : "name",
    "id" : "id",
    "email" : "email"
  },
  "private" : true,
  "watchDate" : "watchDate",
  "rating" : 0.8008281904610115,
  "description" : "description",
  "id" : "id",
  "title" : "title",
  "favorite" : false
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update a film by id
 * Update a film by id
 *
 * body Film 
 * filmId String The id of the film to update
 * returns film
 **/
exports.apiFilmsFilmIdPUT = function(body,filmId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "owner" : {
    "password" : "password",
    "name" : "name",
    "id" : "id",
    "email" : "email"
  },
  "private" : true,
  "watchDate" : "watchDate",
  "rating" : 0.8008281904610115,
  "description" : "description",
  "id" : "id",
  "title" : "title",
  "favorite" : false
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get all films (publics + privates)
 * Get all films (publics + privates)
 *
 * returns film
 **/
exports.apiFilmsGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "owner" : {
    "password" : "password",
    "name" : "name",
    "id" : "id",
    "email" : "email"
  },
  "private" : true,
  "watchDate" : "watchDate",
  "rating" : 0.8008281904610115,
  "description" : "description",
  "id" : "id",
  "title" : "title",
  "favorite" : false
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Add a new film
 * Add a new film
 *
 * body Film 
 * returns film
 **/
exports.apiFilmsPOST = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "owner" : {
    "password" : "password",
    "name" : "name",
    "id" : "id",
    "email" : "email"
  },
  "private" : true,
  "watchDate" : "watchDate",
  "rating" : 0.8008281904610115,
  "description" : "description",
  "id" : "id",
  "title" : "title",
  "favorite" : false
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get all reviews for a film
 * Get all reviews for a film
 *
 * filmId String The id of the film to retrieve
 * returns review
 **/
exports.apiFilmsPublicFilmIdReviewsGET = function(filmId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "reviewDate" : "reviewDate",
  "review" : "review",
  "filmId" : {
    "owner" : {
      "password" : "password",
      "name" : "name",
      "id" : "id",
      "email" : "email"
    },
    "private" : true,
    "watchDate" : "watchDate",
    "rating" : 0.8008281904610115,
    "description" : "description",
    "id" : "id",
    "title" : "title",
    "favorite" : false
  },
  "rating" : 0.8008281904610115,
  "id" : "id",
  "reviewer" : {
    "password" : "password",
    "name" : "name",
    "id" : "id",
    "email" : "email"
  },
  "completed" : false
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get all public films
 * Get all public films
 *
 * returns film
 **/
exports.apiFilmsPublicGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "owner" : {
    "password" : "password",
    "name" : "name",
    "id" : "id",
    "email" : "email"
  },
  "private" : true,
  "watchDate" : "watchDate",
  "rating" : 0.8008281904610115,
  "description" : "description",
  "id" : "id",
  "title" : "title",
  "favorite" : false
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get a public film by id
 * Get a public film by id
 *
 * id String The id of the film to retrieve
 * returns film
 **/
exports.apiFilmsPublicIdGET = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "owner" : {
    "password" : "password",
    "name" : "name",
    "id" : "id",
    "email" : "email"
  },
  "private" : true,
  "watchDate" : "watchDate",
  "rating" : 0.8008281904610115,
  "description" : "description",
  "id" : "id",
  "title" : "title",
  "favorite" : false
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get all endpoints
 * Get all endpoints
 *
 * returns List
 **/
exports.apiGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "path" : "path",
  "methods" : [ "methods", "methods" ]
}, {
  "path" : "path",
  "methods" : [ "methods", "methods" ]
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Assign a new review to a user
 * Assign a new review to a user
 *
 * body Review 
 * returns review
 **/
exports.apiReviewsPOST = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "reviewDate" : "reviewDate",
  "review" : "review",
  "filmId" : {
    "owner" : {
      "password" : "password",
      "name" : "name",
      "id" : "id",
      "email" : "email"
    },
    "private" : true,
    "watchDate" : "watchDate",
    "rating" : 0.8008281904610115,
    "description" : "description",
    "id" : "id",
    "title" : "title",
    "favorite" : false
  },
  "rating" : 0.8008281904610115,
  "id" : "id",
  "reviewer" : {
    "password" : "password",
    "name" : "name",
    "id" : "id",
    "email" : "email"
  },
  "completed" : false
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete a review by id
 * Delete a review by id
 *
 * reviewId String The id of the review to delete
 * no response value expected for this operation
 **/
exports.apiReviewsReviewIdDELETE = function(reviewId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get a review by id
 * Get a review by id
 *
 * reviewId String The id of the review to retrieve
 * no response value expected for this operation
 **/
exports.apiReviewsReviewIdGET = function(reviewId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Update a review by id
 * Update a review by id
 *
 * body Review 
 * reviewId String The id of the review to update
 * returns review
 **/
exports.apiReviewsReviewIdPUT = function(body,reviewId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "reviewDate" : "reviewDate",
  "review" : "review",
  "filmId" : {
    "owner" : {
      "password" : "password",
      "name" : "name",
      "id" : "id",
      "email" : "email"
    },
    "private" : true,
    "watchDate" : "watchDate",
    "rating" : 0.8008281904610115,
    "description" : "description",
    "id" : "id",
    "title" : "title",
    "favorite" : false
  },
  "rating" : 0.8008281904610115,
  "id" : "id",
  "reviewer" : {
    "password" : "password",
    "name" : "name",
    "id" : "id",
    "email" : "email"
  },
  "completed" : false
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get all users
 * Get all users
 *
 * returns user
 **/
exports.apiUsersGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "password" : "password",
  "name" : "name",
  "id" : "id",
  "email" : "email"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get all films for a user
 * Get all films for a user
 *
 * usersId String The id of the user to retrieve
 * returns film
 **/
exports.apiUsersUsersIdFilmsGET = function(usersId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "owner" : {
    "password" : "password",
    "name" : "name",
    "id" : "id",
    "email" : "email"
  },
  "private" : true,
  "watchDate" : "watchDate",
  "rating" : 0.8008281904610115,
  "description" : "description",
  "id" : "id",
  "title" : "title",
  "favorite" : false
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

