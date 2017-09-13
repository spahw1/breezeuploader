var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var fs = require('fs');

var routes = require('./controllers/routes/index');
var users = require('./controllers/routes/users');
var site = require('./controllers/site');
var register = require('./controllers/site/register');
var customer_orders = require('./controllers/site/customer_orders');
var about_us = require('./controllers/site/about-us');
var customer_account = require('./controllers/site/customer_account');
var saveUserProfile = require('./controllers/site/saveUserProfile');
var productDisplay = require('./controllers/site/productDisplay');
var breezeUpload = require('./controllers/site/breezeUpload');
var uploadToken = require('./controllers/site/uploadToken');
var uploadForm = require('./controllers/site/uploadForm');
var openForm = require('./controllers/site/openForm');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', site);
app.use('/register', register);
app.use('/customer_orders', customer_orders);
app.use('/users', users);
app.use('/about-us', about_us);
app.use('/customer_account', customer_account);
app.use('/saveUserProfile', saveUserProfile);
app.use('/productDisplay', productDisplay);
app.use('/breezeUpload', breezeUpload);
app.use('/uploadToken', uploadToken);
app.use('/uploadForm', uploadForm);
app.use('/openForm', openForm);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


//Registring Partials directory. All files in the directory 
// partials are available by filenames as partails
var partialsDir = __dirname + '/views/partials';
var filenames = fs.readdirSync(partialsDir);
filenames.forEach(function (filename) {
  var matches = /^([^.]+).hbs$/.exec(filename);
  if (!matches) {
    return;
  }
  var name = matches[1];
  var template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
  hbs.registerPartial(name, template);
});

hbs.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

hbs.registerHelper('elseCond', function(v1, v2, options) {
  if(v1 !== v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

module.exports = app;
