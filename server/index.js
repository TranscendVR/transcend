require('dotenv').config();
const http = require('http');
const server = http.createServer();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { resolve } = require('path');
const chalk = require('chalk');
const passport = require('passport');

if (process.env.NODE_ENV !== 'production') {
  // Logging middleware (dev only)
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

// Set up session middleware
app.use(require('cookie-session')({
  name: 'session',
  keys: [process.env.SESSION_SECRET || 'an insecure secret key']
}));

// Body parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Authentication middleware
app.use(passport.initialize());
app.use(passport.session());

// Setting up socket.io
const socketio = require('socket.io');
server.on('request', app);
const io = socketio(server);
require('./socket')(io);

// Serve static files
app.use(express.static(resolve(__dirname, '../browser/app.html')));
app.use(express.static(resolve(__dirname, '../browser/stylesheets')));
app.use(express.static(resolve(__dirname, '../public')));

// Routes
app.use('/api', require('./api'));

// Send index.html for anything else
app.get('/*', (req, res) => {
  res.sendFile(resolve(__dirname, '../browser/app.html'));
});

const port = process.env.PORT || 1337;
server.listen(port, () => {
  console.log(chalk.blue(`--- Listening on port ${port} ---`));
});

app.use('/', (err, req, res, next) => {
  console.log(chalk.red('Houston, we have a problem'));
  console.log(chalk.red(`ERROR: ${err.message}`));
  res.sendStatus(err.status || 500);
});
