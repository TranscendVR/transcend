const db = require('./index');

const seedUsers = () => db.Promise.map([
  { name: 'Omri Bernstein', displayName: 'ArmyBarnstorm', email: 'omri@transcend.vr', password: '1234' },
  { name: 'Barack Obama', displayName: 'BMoney', email: 'barack@transcend.vr', password: '1234' },
  { name: 'Joey Darbyshire', displayName: 'HeadForFeet', email: 'joey@transcend.vr', password: '1234' },
  { name: 'Sean McBride', displayName: 'OfficerMcLineChef', email: 'sean@transcend.vr', password: '1234' },
  { name: 'Yoo-Nah Park', displayName: 'TheChair', email: 'yoo-nah@transcend.vr', password: '1234' },
  { name: 'Beth Qiang', displayName: 'AnotherRaceCondition', email: 'beth@transcend.vr', password: '1234' },
  { name: 'Eliot Sfiwbdflkuwsjkdfhweioj', displayName: 'TheNextOgdenMorrow', email: 'eliot@transcend.vr', password: '1234' },
  { name: 'Amrom Steinmetz', displayName: 'GoogleFu', email: 'amrom@transcend.vr', password: '1234' },
  { name: 'Amy Paschal', displayName: 'TinyFontResume', email: 'amy@transcend.vr', password: '1234' },
  { name: 'Andrew Garcia', displayName: 'ArduinosaurusRex', email: 'andrew@transcend.vr', password: '1234' },
  { name: 'Dani YS', displayName: 'DJRoomba', email: 'dani@transcend.vr', password: '1234' },
  { name: 'Dennis Deng', displayName: 'TableStakes', email: 'dennis@transcend.vr', password: '1234' },
  { name: 'Evan DiGiambattista', displayName: 'FretboardRadius', email: 'evan@transcend.vr', password: '1234' },
  { name: 'Joe Cumins', displayName: 'GreenRanger', email: 'joe@transcend.vr', password: '1234' },
  { name: 'Mark Hario', displayName: 'CheaterBead', email: 'markh@transcend.vr', password: '1234' },
  { name: 'Rachel Bird', displayName: 'MrsFederer', email: 'rachel@transcend.vr', password: '1234' },
  { name: 'Geoff Bass', displayName: 'TheRealGeoff', email: 'geoff@transcend.vr', password: '1234' },
  { name: 'Mark Davis', displayName: 'FreshBaked', email: 'markd@transcend.vr', password: '1234' },
  { name: 'Surabhi Nigam', displayName: 'WebWorker', email: 'surabhi@transcend.vr', password: '1234' }
], user => db.model('users').create(user));

db.didSync
  .then(() => db.sync({ force: true }))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .catch(error => console.error(error))
  .finally(() => db.close());
