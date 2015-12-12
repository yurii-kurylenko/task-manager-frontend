
var express = require('express');

var http = require('http');
var path = require('path');

var appDir = path.join(__dirname, 'www');

var app = express();

global.NODE_ENV = app.settings.env = 'development';

app.set('port', process.env.PORT || process.argv[2] || 4000);

app.use(express["static"](appDir));

app.disable('etag');

// simple router
app.get('*', function(req, res) {
  return res.status(200).sendFile(appDir + '/index.html');
});

app.use(function(req, res) {
  return res.sendFile('./www/index.html', {
    root: __dirname
  });
});

var server = http.createServer(app);

server.listen(app.get('port'), function() {
  return console.log('Express server listening on port ' + app.get('port'));
});