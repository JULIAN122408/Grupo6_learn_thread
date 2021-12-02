require("dotenv").config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var database = require("./config/database");
var auth = require("./auth/main_auth");
var cors =require('cors')//conecta al back


var database = require("./config/database");

//mongo conect
database.mongoConnect();


//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var learnThreadRouter= require('./routes/learnThread.router');
var empleadosRouter= require('./routes/empleados.router');
var usuariosRouter = require('./routes/usuario.router');
const {router} = require("express");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, '/site/')));    //Para correr en heroku
// app.use(express.static(path.join(__dirname, 'public'))); //Original
app.use(cors())

app.use('/usuarios', usuariosRouter);

//ROUTER
app.use('/learnthreads', learnThreadRouter);
app.use('/empleados', empleadosRouter);
// app.use(auth)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//Iniciar el servidor
// const port = process.env.PORT;
// console.log('Modo:'+ process.env.NODE_ENV);
// console.log(`Servidor corriendo en http://localhost:${port}`);


module.exports = app;
