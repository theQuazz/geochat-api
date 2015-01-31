var MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/geochat';

var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var logger     = require('morgan');
var passport   = require('passport');

var auth     = require('./auth');
var messages = require('./routes/messages');
var users    = require('./routes/users');

var app = express();

app.set('json spaces', 2);

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());

app.post('/users', auth.facebook, users.create);

app.get('/messages/mock', /* auth.required , */ messages.mock);
app.get('/messages',      /* auth.required , */ messages.list);
app.post('/messages',     /* auth.required , */ messages.create);

mongoose.connect(MONGO_URI);
mongoose.set('debug', true);

module.exports = app;
