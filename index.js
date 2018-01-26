/**
 * Module dependencies.
 */
const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const path = require('path');
const grid = require('./models/loadGridControl');

// Controllers (route handlers).
var router = require('./routes/routes');
var xlsxj = require("xlsx-to-json");
var fs = require('fs');
var http = require('http')
 //Create Express server.
const app = express();


/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3026);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set static files (css, image, etc) location
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })); 

/**
 * Primary app routes.
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/', router);
app.use('/grids', grid);
 /**
 * Error Handler.
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('App is running at http://localhost:%d', app.get('port'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;