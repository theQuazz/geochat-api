var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var logger     = require('morgan');

var routes = require('./routes');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/geochat');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/messages/mock', routes.messages.mock);
app.get('/messages',      routes.messages.list);
app.post('/messages',     routes.messages.create);

var PORT = process.env.PORT || 3000;
var ENV  = process.env.NODE_ENV || 'development';

app.listen(PORT, function() {
  console.log('Listening on port %d (%s)', PORT, ENV);
});
