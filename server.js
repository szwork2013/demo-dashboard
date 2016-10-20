var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var express = require('express');
var proxy = require('express-http-proxy');
var cookieParser = require('cookie-parser');
var reactCookie = require('react-cookie');

// Webpack config.
var config = require('./webpack.config');

var app = new (express)();
var host = process.env.IP;
var port = process.env.PORT || 4000;

var compiler = webpack(config);
app.use(cookieParser());
app.use(webpackDevMiddleware(compiler, { noInfo: true, stats: 'errors-only' }));
app.use(webpackHotMiddleware(compiler));

app.all('/api2/*', proxy('https://stage-api.welltory.com', { preserveHostHdr: true }));

app.get('*', function(req, res) {
  reactCookie.plugToRequest(req, res);
  res.sendFile(__dirname + '/dist/index.html');
});


app.listen(port, host, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});