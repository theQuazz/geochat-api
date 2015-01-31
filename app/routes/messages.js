
var Message = require('../models/message');

var messages = {};

var facebook = require('./facebook.js');

messages.mock = function(req, res) {
  res.json([
    { message: 'test message 1!', sentAt: new Date(), loc: ['43.659405199999995', '-79.3973439'] },
    { message: 'test message 2!', sentAt: new Date(), loc: ['43.659405199999995', '-79.3973439'] }
  ]);
};

messages.create = function(req, res) {
  var message = new Message;

  message.set(res.body);
  messsag.set({ user: req.user });

  message.save(function(err) {
    if (err) {
      return res.status(400).json({error: err.message});
    }

    res.json(message);
  });
};

messages.list = function(req, res) {
  var point = [ req.query.lat, req.query.lng ];
  var since = req.query.since || new Date();

  var query = Message
        .find()
        .where('loc', {
          $nearSphere: {
            $geometry: {
              type: 'Point',
              coordinates: point
            },
            $maxDistance: 50
          }
        })
        .where('sendAt')
        .gt(since)
        .populate('user', ['name', 'facebookId']);

  query.exec(function(err, messages) {
    if (err) {
      return res.status(500).json({error: err.message});
    }
  
    facebook.getFbData(req.query.accessToken,'me/friends',function(data){
      res.json({friendList: data, messages: messages});
    });
  });
};

/*

{
	messages: [
		{ messages: ..., loc: ..., ...}
	],
	fiendList: [
		{ name: ..., asldkfj: ...}
	]
}
*/

module.exports = messages;
