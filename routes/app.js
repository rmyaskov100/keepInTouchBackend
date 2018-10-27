const express = require('express');
const path = require ('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

//View engine setup
app.set('views', path.join(_dirname, 'views'));
app.set('view engine', 'jade');

//app.uselogger(favicon(path.join(_dirname, 'public', 'favico.ico' )));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(_dirname, 'public')));

app.use('/', index);
app.use('/users', users);

//Catch 404 and forward to an error handler 
app.use(function(req, res, next) {
    let err = new Error('Not found');
    err.status = 404;
    next(err);
});

//Error handler
app.use(function(req, res, next) {
    //Set locals, only providing errors in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err: {};

    //Render the error page 
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;