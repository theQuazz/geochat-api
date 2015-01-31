var PORT = process.env.PORT || 3000;
var ENV  = process.env.NODE_ENV || 'development';

var app = require('./app');

app.listen(PORT, function() {
  console.log('Listening on port %d (%s)', PORT, ENV);
});
