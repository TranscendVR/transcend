const http = require('http');
const server = http.createServer();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { resolve } = require('path');
const chalk = require('chalk');
require('dotenv').config();

if (process.env.NODE_ENV !== 'production') {
  // Logging middleware (dev only)
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

// Body parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setting up socket.io
const socketio = require('socket.io');
server.on('request', app);
const io = socketio(server);
require('./socket')(io);

// Serve static files
app.use(express.static(resolve(__dirname, '../browser/app.html')));
app.use(express.static(resolve(__dirname, '../browser/favicon/favicon.ico')));
app.use(express.static(resolve(__dirname, '../public')));

// Our custom routes will go here

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
