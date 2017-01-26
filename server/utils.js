const randomcolor = require('randomcolor');
const users = [];

// User constructor
function User (id) {
  this.id = id;
  this.color = randomcolor();
  this.x = 0;
  this.y = 1.6;
  this.z = 5;
  this.xrot = 0;
  this.yrot = 0;
  this.zrot = 0;
}

// Create a user given the socket ID
function createUser (id) {
  const user = new User(id);
  return user;
}

// Find the user object from the users array
function userFromId (id) {
  let user;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      user = users[i];
      break;
    }
  }
  return user;
}

// When a user connects, send them a list of all of the existing users
function getOtherUsers (users, id) {
  return users.filter(user => user.get('id') !== id);
}

// Update a user's position and rotation when it's pushed from the frontend
function updatePosition (userData) {
  const user = userFromId(userData.id);
  user.x = userData.position.x;
  user.y = userData.position.y;
  user.z = userData.position.z;
  user.xrot = userData.rotation.x;
  user.yrot = userData.rotation.y;
  user.zrot = userData.rotation.z;
  return user;
}

// Remove a user from the users array
function removeUser (id) {
  const user = userFromId(id);
  const index = users.findIndex(userToRemove => userToRemove.id === id);
  users.splice(index, 1);
  return user;
}

module.exports = {
  users,
  createUser,
  userFromId,
  getOtherUsers,
  updatePosition,
  removeUser
};
