// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user');
const Session = require('./session');
const Square = require('./square');

Session.belongsTo(User);
User.hasOne(Session);

module.exports = { User, Session, Square };
