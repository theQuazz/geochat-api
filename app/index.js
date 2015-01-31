var MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/geochat';

var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var logger     = require('morgan');
var passport   = require('

var messages = require('./routes/messages');
var users    = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/messages/mock', messages.mock);
app.get('/messages',      messages.list);
app.post('/messages',     messages.create);

app.post('/users', users.create);

mongoose.connect(MONGO_URI);
mongoose.set('debug', true);

module.exports = app;
