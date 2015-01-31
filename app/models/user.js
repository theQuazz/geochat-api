var mongoose = require('mongoose');
var crypto   = require('crypto');

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var User = new Schema({
  facebookId: { type: String, required: true },
  token: { type: String, required: true }
});

User.pre('validate', function(fn) {
  if (!this.token) this.genToken(fn);
  else fn();
});

User.methods.genToken = function(fn) {
  crypto.randomBytes(64, function(err, token) {
    if (err) return fn(err);
    this.token = token.toString('hex');
    fn();
  }.bind(this));
};

module.exports = mongoose.model('User', User);
