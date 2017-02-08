const randomcolor = require('randomcolor');

// User constructor
function User (id) {
  this.id = id;
  this.color = randomcolor();
  this.x = Math.random() * 30 - 15;
  this.y = 1.3;
  this.z = Math.random() * 30 - 15;
  this.xrot = 0;
  this.yrot = 0;
  this.zrot = 0;
  this.scene = '';  // VR scene
}

// Create a user given the socket ID
function createUser (id) {
  const user = new User(id);
  return user;
}

// When a user connects, send them a list of all of the existing users (minus themselves)
function getOtherUsers (users, id) {
  return users.filterNot(userData => userData.get('id') === id);
}

module.exports = {
  createUser,
  getOtherUsers
};
