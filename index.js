var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

var Schema = mongoose.Schema;

var messageSchema = new Schema({
  message:  {type: String, required: true},
  loc:      {type: [Number], index: '2d', required: true},
  sentAt:   {type: Date, default: Date.now, required: true},
  sendAt:   {type: Date, default: Date.now, required: true},
  duration: {type: Number, default: Infinity, required: true}
});

mongoose.connect('mongodb://localhost:27017/geochat');

var Message = mongoose.model('Message', messageSchema);

var app = express();

app.use(bodyParser.json());

app.get('/messages', function(req, res) {
  message.find(function(err, messages) {
    if (err) {
      return res.status(500).json({error: err.message});
    }

    res.json(messages);
  });
});

app.post('/messages', function(req, res) {
  var message = new Message;

  message.set(res.body);

  message.save(function(err) {
    if (err) {
      return res.status(400).json({error: err.message});
    }

    res.json(message);
  });
});

var PORT = process.env.PORT || 3000;
var ENV  = process.env.NODE_ENV || 'development';

app.listen(PORT, function() {
  console.log('Listening on port %d (%s)', PORT, ENV);
});
