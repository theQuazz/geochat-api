var mongoose = require('mongoose');

var Schema   = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var Read = new Schema({
  user:    { type: ObjectId, ref: 'User' },
  message: { type: ObjectId, ref: 'Message' }
});

Read.index({ user: 1, message: 1 });

Read.statics.mark = function(user, messages, fn) {
  if (!user) return fn();

  var objs = messages.map(function(message) {
    return { user: user, message: message._id };
  });

  this.collection.insert(objs, { ordered: false }, fn);
};

module.exports = mongoose.model('Read', Read);
