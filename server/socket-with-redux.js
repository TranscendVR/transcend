const chalk = require('chalk');
const { Map } = require('immutable');

const store = require('./redux/store');
const { createAndEmitUser, updateUserData, removeUserAndEmit } = require('./redux/reducers/user-reducer');
const { getOtherUsers } = require('./utils');

module.exports = io => {
  io.on('connection', socket => {
    console.log(chalk.yellow(`${socket.id} has connected`));

    // new user enters; create new user and new user appears for everyone else
    store.dispatch(createAndEmitUser(socket));

    // This will send all of the current users to the user that just connected
    socket.on('getOthers', () => {
      const allUsers = store.getState().users;
      socket.emit('getOthersCallback', getOtherUsers(allUsers, socket.id));
    });

    // This is a check to ensure that all of the existing users exist on the DOM
    // before pushing updates to the backend
    socket.on('haveGottenOthers', () => {
      socket.emit('startTick');
    });

    // This is a check to ensure that everything is loaded before the new user
    // starts requesting updates from the backend
    socket.on('readyToReceiveUpdates', () => {
      socket.emit('startTheInterval');
    });

    // This will update a user's position when they move, and send it to everyone
    // except the specific scene's user
    socket.on('tick', userData => {
      userData = Map(userData);
      store.dispatch(updateUserData(userData));
    });

    // This will send an array of users except for the specific scene's user
    // Used to update position and rotation every x interval, as specified by the front-end
    // This is literally the same as `getOthers` above
    // DEFINITE TODO SOON: we want the backend to push state to the front-end, vs. the front-end requesting information on an interval from the back-end
    socket.on('getUpdate', () => {
      const allUsers = store.getState().users;
      socket.emit('usersUpdated', getOtherUsers(allUsers, socket.id));
    });

    socket.on('disconnect', () => {
      store.dispatch(removeUserAndEmit(socket));
      console.log(chalk.magenta(`${socket.id} has disconnected`));
    });
  });
};
