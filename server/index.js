const http = require('http');
const server = http.createServer();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { resolve } = require('path');

const morgan = require('morgan');
const chalk = require('chalk');

if (process.env.NODE_ENV !== 'production') {
  // Logging middleware (dev only)
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
app.use(express.static(resolve(__dirname, '..', 'public')));

// Our custom routes will go here

// Send index.html for anything else
app.get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html')));

const port = process.env.PORT || 1337;
server.listen(port, () => {
  console.log(chalk.green(`--- Listening on port ${port} ---`));
});

app.use('/', (err, req, res, next) => {
  console.log(chalk.red('Houston, we have a problem'));
  console.log(chalk.red(`ERROR: ${err.message}`));
  res.sendStatus(err.status || 500);
});
