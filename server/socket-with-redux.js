const chalk = require('chalk');

const store = require('./redux/store');
const { createAndEmitUser } = require('./redux/reducers/user-reducer');
const { getOtherUsers } = require('./utils');

module.exports = io => {
  io.on('connection', socket => {
    console.log(chalk.yellow(`${socket.id} has connected`));

    // let users = store.getState();
    // new user enters; create new user and new user appears for everyone else
    store.dispatch(createAndEmitUser(socket));
    socket.on('getOthers', () => {
      const allUsers = store.getState().users;
      socket.emit('getOthersCallback', getOtherUsers(allUsers, socket.id));
    });
  });
};
