'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.apiAuthDELETE = function apiAuthDELETE (req, res, next) {
  Default.apiAuthDELETE()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiAuthGET = function apiAuthGET (req, res, next) {
  Default.apiAuthGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiAuthPOST = function apiAuthPOST (req, res, next, body) {
  Default.apiAuthPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiGET = function apiGET (req, res, next) {
  Default.apiGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiReviewsPOST = function apiReviewsPOST (req, res, next, body) {
  Default.apiReviewsPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiReviewsReviewIdDELETE = function apiReviewsReviewIdDELETE (req, res, next, reviewId) {
  Default.apiReviewsReviewIdDELETE(reviewId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiReviewsReviewIdGET = function apiReviewsReviewIdGET (req, res, next, reviewId) {
  Default.apiReviewsReviewIdGET(reviewId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiReviewsReviewIdPUT = function apiReviewsReviewIdPUT (req, res, next, body, reviewId) {
  Default.apiReviewsReviewIdPUT(body, reviewId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiUsersGET = function apiUsersGET (req, res, next) {
  Default.apiUsersGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiUsersUsersIdFilmsGET = function apiUsersUsersIdFilmsGET (req, res, next, usersId) {
  Default.apiUsersUsersIdFilmsGET(usersId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
