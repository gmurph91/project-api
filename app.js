var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var newRouter = require('./routes/get');
require('dotenv').config({ path: './.env' })
var app = express();
var cors = require('cors')
var port = process.env.PORT;
const bodyParser = require('body-parser')
const mongodb = require('mongodb')
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.ATLAS_CONNECTION
const instance = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5040');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, FETCH, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/get', (req, res) => {
  instance.connect((err, client) => {
    if (err) res.send(err)
    const collection = client.db("project-database").collection("movies")
    collection.find().toArray().then(r => res.send(r))
  })
})

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

module.exports = app;

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
