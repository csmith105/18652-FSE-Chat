// DB setup
const Sequelize = require('sequelize');

sequelize = new Sequelize('database', null, null, {
  dialect: 'sqlite',
  storage: 'db/database.sqlite'
});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

// Model setup
User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    validate: { len: [2, 15], isAlphanumeric: true, }
  },
  password: {
    type: Sequelize.STRING,
    validate: { len: [3, 64] }
  }
});

User.sync({force: true});

Message = sequelize.define('Message', {
  content: {
    type: Sequelize.STRING,
    validate: { len: [1, 255] }
  }
});

Message.belongsTo(User);

Message.sync({force: true});

var express = require('express');
var cookieParser = require('cookie-parser');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var login = require('./routes/login');
var logout = require('./routes/logout');
var register = require('./routes/register');

var app = express();
app.use(cookieParser());

// Session
var session = require('express-session');
app.use(session({
    name: 'app.sid',
    secret: '1234',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', index);
app.use('/login', login);
app.use('/logout', logout);
app.use('/register', register);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
