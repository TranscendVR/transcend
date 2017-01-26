const { Map } = require('immutable');
const chalk = require('chalk');
const utils = require('./utils');

const store = require('./redux/store');
const { addUser } = require('./redux/reducers/user-reducer');

module.exports = io => {
  io.on('connection', socket => {
    console.log(chalk.yellow(`${socket.id} has connected`));

    // let users = store.getState();
    const id = socket.id;
    const user = Map(utils.createUser(id));
    console.log('right after user is created', user);
    store.dispatch(addUser(user));
    socket.on('sceneLoad', () => {
      console.log('right before user is sent', user);
      socket.emit('createUser', user);
    });
    socket.broadcast.emit('newUser', user);
  });
};
