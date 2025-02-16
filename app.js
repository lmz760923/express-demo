var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer=require('multer');
var manageRouter = require('./routes/manager');
const frontRouter=require('./routes/front');
const fs  = require('fs');
const db=require('./dao/db');

var app = express();

const uploadDir=path.join(__dirname,'uploads');
if (!fs.existsSync(uploadDir)){fs.mkdirSync(uploadDir,{recursive:true})}

app.use('/uploads',express.static(uploadDir));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(session({
secret: 'your_secret_key',
resave: false,
saveUninitialized: true,
cookie: { secure: false } // 在生产环境中应设置为true，并使用HTTPS
}));
// 中间件：将会话数据传递给模板
app.use((req, res, next) => {
res.locals.session = req.session;
next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/manage',manageRouter);
app.use('/',frontRouter);

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
