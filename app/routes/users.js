
var User = require('../models/user');

var users = {};

users.create = function(req, res) {
  res.status(req.user ? 200 : 401).json(req.user);
}


module.exports = users;
