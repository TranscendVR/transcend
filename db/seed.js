const db = require('./index');

const seedUsers = () => db.Promise.map([
  { name: 'Omri Bernstein', displayName: 'Omri', email: 'codejesus@fullstack.com', password: '1234' },
  { name: 'Barack Obama', displayName: 'Barack', email: 'bmoney@whitehouse.gov', password: '1234' }
], user => db.model('users').create(user));

db.didSync
  .then(() => db.sync({ force: true }))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .catch(error => console.error(error))
  .finally(() => db.close());
