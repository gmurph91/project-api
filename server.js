var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var moviesRouter = require('./routes/movies');
const Pusher = require('pusher');
var blogRouter = require('./routes/blog');
var codeRouter = require('./routes/codenames')
var appleRouter = require('./routes/apples')
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
var cors = require('cors')
var port = process.env.PORT;
const bodyParser = require('body-parser')
io.listen(server);
require('dotenv').config({ path: './.env' })

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json())
app.use(cors());

var pusher = new Pusher({
  appId: '953987',
  key: '462207fd95a0750caf6c',
  secret: '92abccd7d06d8ced65ac',
  cluster: 'us3',
  encrypted: true
});

io.on('connection', function(socket){
  socket.on('room', function(room) {
    socket.join(room);
});
  socket.on('green card', function(card){
    let room = card.room
    socket.join(room);
    io.in(room).emit('green card', card);
  });
  socket.on('red card', function(card){
    let room = card.room
    socket.join(room);
    io.in(room).emit('red card', card);
  });
  socket.on('remove reds', function(cards){
    let room = cards.room
    socket.join(room);
    io.in(room).emit('remove reds', cards);
  });
  socket.on('join game', function(user){
    let room = user.room
    socket.join(room);
    io.in(room).emit('join game', user);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


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
app.use('/movies', moviesRouter);
app.use('/blog', blogRouter);
app.use('/codenames', codeRouter);
app.use('/apples', appleRouter);

app.post('/message', (req, res) => {
  const payload = req.body;
  const id = req.body.id;
  pusher.trigger(`private-${id}`, 'message', payload);
  res.send(payload)
});

app.post('/pusher/auth', function(req, res) {
  var socketId = req.body.socket_id;
  var channel = req.body.channel_name;
  var auth = pusher.authenticate(socketId, channel);
  res.send(auth);
});

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

server.listen(port, () => console.log(`API listening on port ${port}!`))
