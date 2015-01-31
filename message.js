var mongoose   = require('mongoose');

var Schema   = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var Message = new Schema({
  message:  { type: String, required: true },
  loc:      { type: [Number], index: '2dsphere', required: true },
  sentAt:   { type: Date, default: Date.now, required: true },
  sendAt:   { type: Date, default: Date.now, required: true },
  duration: { type: Number, default: Infinity, required: true },
  // user:     { type: ObjectId, required: true },
});

module.exports = mongoose.model('Message', Message);
