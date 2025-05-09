var debug = require('debug')('express-demo:server');
var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var manageRouter = require('./routes/manager');
const frontRouter=require('./routes/front');
const fs  = require('fs');


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

var port = normalizePort(process.env.PORT || '8080');
//app.set('port', port);

/**
 * Create HTTP server.
 */

//var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */


app.on('error', onError);
app.on('listening', onListening);
app.listen(port);
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = app.addr;
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
  console('Listening on ' + bind);
}
