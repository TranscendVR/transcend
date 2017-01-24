const chalk = require('chalk');

module.exports = io => {
  io.on('connection', socket => {
    console.log(chalk.yellow(`${socket.id} has connected`));

    socket.on('disconnect', () => {
      console.log(chalk.magenta(`${socket.id} has disconnected`));
    });
  });
};
