const db = require('./index');

const seedUsers = () => db.Promise.map([
  { name: 'Omri Bernstein', displayName: 'ArmyBarnstorm', email: 'omri@transcend.vr', password: '1234', skin: '3djesus' },
  { name: 'Barack Obama', displayName: 'BMoney', email: 'barack@transcend.vr', password: '1234', skin: 'agentsmith' },
  { name: 'Joey Darbyshire', displayName: 'HeadForFeet', email: 'joey@transcend.vr', password: '1234', skin: 'batman' },
  { name: 'Sean McBride', displayName: 'Mainframe', email: 'sean@transcend.vr', password: '1234', skin: 'Mario' },
  { name: 'Yoo-Nah Park', displayName: 'TheChair', email: 'yoo-nah@transcend.vr', password: '1234', skin: 'god' },
  { name: 'Beth Qiang', displayName: 'AnotherRaceCondition', email: 'beth@transcend.vr', password: '1234', skin: 'Iron-Man-Minecraft-Suit' },
  { name: 'Eliot Sfiwbdflkuwsjkdfhweioj', displayName: 'TheNextOgdenMorrow', email: 'eliot@transcend.vr', password: '1234', skin: 'char' },
  { name: 'Amrom Steinmetz', displayName: 'GoogleFu', email: 'amrom@transcend.vr', password: '1234', skin: 'jetienne' },
  { name: 'Amy Paschal', displayName: 'TinyFontResume', email: 'amy@transcend.vr', password: '1234', skin: 'Joker' },
  { name: 'Andrew Garcia', displayName: 'ArduinosaurusRex', email: 'andrew@transcend.vr', password: '1234', skin: 'Mario' },
  { name: 'Dani YS', displayName: 'DJRoomba', email: 'dani@transcend.vr', password: '1234', skin: 'martialartist' },
  { name: 'Dennis Deng', displayName: 'TableStakes', email: 'dennis@transcend.vr', password: '1234', skin: 'robocop' },
  { name: 'Evan DiGiambattista', displayName: 'FretboardRadius', email: 'evan@transcend.vr', password: '1234', skin: 'Sonicthehedgehog' },
  { name: 'Joe Cumins', displayName: 'GreenRanger', email: 'joe@transcend.vr', password: '1234', skin: 'blackRanger' },
  { name: 'Mark Hario', displayName: 'CheaterBead', email: 'markh@transcend.vr', password: '1234', skin: 'Superman' },
  { name: 'Rachel Bird', displayName: 'MrsFederer', email: 'rachel@transcend.vr', password: '1234', skin: 'theflash' },
  { name: 'Geoff Bass', displayName: 'TheRealGeoff', email: 'geoff@transcend.vr', password: '1234', skin: 'woody' },
  { name: 'Mark Davis', displayName: 'FreshBaked', email: 'markd@transcend.vr', password: '1234', skin: 'Spiderman' },
  { name: 'Surabhi Nigam', displayName: 'WebWorker', email: 'surabhi@transcend.vr', password: '1234', skin: 'jetienne' }
], user => db.model('users').create(user));

db.didSync
  .then(() => db.sync({ force: true }))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .catch(error => console.error(error))
  .finally(() => db.close());
