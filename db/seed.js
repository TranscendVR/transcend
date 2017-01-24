const db = require('./index');

const seedUsers = () => db.Promise.map([
  { name: 'Omri Bernstein', email: 'codejesus@fullstack.com', password: '1234' },
  { name: 'Barack Obama', email: 'bmoney@whitehouse.gov', password: '1234' }
], user => db.model('users').create(user));

db.didSync
  .then(() => db.sync({ force: true }))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .catch(error => console.error(error))
  .finally(() => db.close());
