const express = require('express');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');

const app = express();
app.use(history());
app.use('/', serveStatic(__dirname + '/dist'));

const port = process.env.PORT || 8080;

app.listen(port, function () {
  console.log('Listen on port: ' + port);
})
