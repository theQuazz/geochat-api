var _    = require('lodash');
var User = require('../models/user');

var users = {};

users.create = function(req, res) {
  res.status(req.user ? 200 : 401).json(_.omit(req.user.toObject(), 'fbToken', '__v'));
}


module.exports = users;
