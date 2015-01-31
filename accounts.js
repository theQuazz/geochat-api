var mongoose = require('mongoose');

var schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var accountDetail = new schema({
   UserId: { type: ObjectId, required = true},
   UserName: { type: String, required = true},
   Password: { type: string, required = true},
});

module.exports = mongoose.model('accountDetail', accountDetail);
