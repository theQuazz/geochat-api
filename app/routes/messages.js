
var Message = require('../models/message');
var Read    = require('../models/read');

var messages = {};

messages.create = function(req, res) {
  var message = new Message();

  message.set(req.body);
  message.set({ user: req.user });

  message.save(function(err) {
    if (err) {
      return res.status(400).json({error: err.message});
    }

    res.json(message);
  });
};

messages.list = function(req, res) {
  var since = req.query.since || 0;

  var query = Message
    .find()
    .where('sendAt')
    .gt(since)
    .populate('user', 'name facebookId');

  var respond = function() {
    query.exec(function(err, messages) {
      if (err) {
        return res.status(500).json({error: err.message});
      }

      Read.mark(req.user, messages, function(err) {
        res.json(messages);
      });
    });
  };

  if (req.query.lat && req.query.lng) {
    query = query
      .where('loc', {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [ req.query.lat, req.query.lng ]
          },
          $maxDistance: 50
        }
      });

    if (req.user) {
      Read.distinct('message', { user: req.user }, function(err, messages) {
        if (err) return fn(err);

        query = query.where('message').nin(messages);

        respond();
      });
    } else {
      respond();
    }
  } else if (req.user) {
    Read.distinct('message', { user: req.user }, function(err, messages) {
      if (err) return fn(err);

      query = query.where('message').in(messages);

      respond();
    });
  } else {
    respond();
  }
};

module.exports = messages;
