var Message = require('./message');
var async   = require('async');

var server = require('./server');

var messages = [
  new Message({
    message: 'test message 1',
    loc: [43.6593868, -79.39736889999999],
    sentAt: new Date('12/27/14'),
    sendAt: new Date('01/31/15 14:00')
  }),
  new Message({
    message: 'test message 2',
    loc: [43.6593868, -79.39736889999999],
    sentAt: new Date('2/14/14'),
    sendAt: new Date('01/31/15 10:00')
  }),
  new Message({
    message: 'test message 2',
    loc: [43.6593868, -79.39736889999999],
    sentAt: new Date('2/14/14'),
    sendAt: new Date('01/1/15 00:00')
  }),
];

async.each(messages, function(message, fn) {
  message.save(fn);
}, process.exit);
