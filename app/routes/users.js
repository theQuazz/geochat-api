
var User = require('../models/user');

var users = {};

users.create = function(req, res) {
  var user = new User;

  user.set(req.body);

  user.save(function(err) {
    if (err) {
      return res.status(400).json({error: err.message});
    }

    res.json(user);
  });
}


module.exports = users;
