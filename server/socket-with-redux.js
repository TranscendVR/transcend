const chalk = require('chalk');

const store = require('./redux/store');
const { createAndEmitUser } = require('./redux/reducers/user-reducer');

module.exports = io => {
  io.on('connection', socket => {
    console.log(chalk.yellow(`${socket.id} has connected`));

    // let users = store.getState();
    store.dispatch(createAndEmitUser(socket));
  });
};
