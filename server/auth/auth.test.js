const request = require('supertest-as-promised');
const {expect} = require('chai');
const db = require('APP/db');
const User = require('APP/db/models/user');
const app = require('../start');

const alice = {
  name: 'Alice',
  username: 'alice@secrets.org',
  password: '12345'
};

const bert = {
  name: 'Bert',
  username: 'bert@ilovebeards.edu',
  password: '12345',
  isAdmin: false
};

const lars = {
  name: 'Lars',
  username: 'lars@ihearthipsterbeards.io',
  password: '12345',
  isAdmin: false
};

// The admin
const gertrude = {
  name: 'Gertude',
  username: 'gertrude@thehammer.org',
  password: '12345',
  isAdmin: true
};

describe('/api/auth', () => {
    let howManyUsers;

    before('create a user', () => {

        return db.didSync
        .then(() =>
        User.create(
            {
                name: alice.name,
                email: alice.username,
                password: alice.password
            })
        )
        .then((createdUser) => {
            alice.id = createdUser.id;
            return User.create({
                name: bert.name,
                email: bert.username,
                password: bert.password,
                isAdmin: bert.isAdmin
            });
        })
        .then((createdUser) => {
            bert.id = createdUser.id;
            return User.create({
                name: lars.name,
                email: lars.username,
                password: lars.password,
                isAdmin: lars.isAdmin
            });
        })
        .then((createdUser) => {
            lars.id = createdUser.id;
            return User.create({
                name: gertrude.name,
                email: gertrude.username,
                password: gertrude.password,
                isAdmin: gertrude.isAdmin
            });
        })
        .then((createdUser) => {
            gertrude.id = createdUser.id;
            return User.findAll();
        })
        .then(allusers => {
            howManyUsers = allusers.length;
        });
    });

  describe('POST /local/login (username, password)', () => {
    it('succeeds with a valid username and password', () =>
      request(app)
        .post('/api/auth/local/login')
        .send(alice)
        .expect(302)
        .expect('Set-Cookie', /session=.*/)
        .expect('Location', '/')
    );

    it('fails with an invalid username and password', () =>
      request(app)
        .post('/api/auth/local/login')
        .send({username: alice.username, password: 'wrong'})
        .expect(401)
    );
});

  describe('Admin privileges', () => {
      const agent = request.agent(app);

      before('log in', () => agent
        .post('/api/auth/local/login')
        .send(gertrude));

        it('Can retrieve all users', () =>
          agent.get('/api/users')
            .expect(200)
            .then(res => expect(res.body.length).to.equal(howManyUsers))
        );

        it('Can update themself (Gertrude)', () => {
            agent.put(`/api/users/${gertrude.id}`)
            .send({
                name: 'THE Gertrude'
            })
            .expect(200)
            .then(res => expect(res.body).to.contain({
                name: 'THE Gertrude'
            }));
        });

        it('Can update others (Alice)', () => {
            agent.put(`/api/users/${alice.id}`)
            .send({
                name: 'Alice in Wonderland'
            })
            .expect(200)
            .then(res => expect(res.body).to.contain({
                name: 'Alice in Wonderland'
            }));
        });

        it('Can give others admin status (Bert)', () => {
            agent.put(`/api/users/${bert.id}`)
            .send({
                isAdmin: true
            })
            .expect(200)
            .then(res => expect(res.body).to.contain({
                name: 'Bert',
                isAdmin: true
            }));
        });

        // TODO: doesn't seem to work, not sure what's wrong
        it('Can delete a user (Lars)', () => {
            agent.delete(`/api/users/${lars.id}`)
            .expect(204);
        });
  });

  describe('GET /whoami', () => {
      describe('when logged in,', () => {
          const agent = request.agent(app);
          before('log in', () => agent
          .post('/api/auth/local/login')
          .send(alice));

          it('responds with the currently logged in user', () =>
          agent.get('/api/auth/whoami')
          .set('Accept', 'application/json')
          .expect(200)
          .then(res => expect(res.body).to.contain({
              email: alice.username
          }))
          );

          it('can adjust their own user settings', () => {
              agent.put(`/api/users/${alice.id}`)
              .send({
                  name: 'THE Alice in Wonderland'
              })
              .expect(200)
              .then(res => expect(res.body).to.contain({
                  name: 'THE Alice in Wonderland'
              }));
          });

          it('cannot adjust their own user settings to be admin status', () => {
              agent.put(`/api/users/${alice.id}`)
              .send({
                  name: 'THE Alice in Wonderland',
                  isAdmin: true
              })
              .expect(200)
              .then(res => expect(res.body).to.contain({
                  name: 'THE Alice in Wonderland',
                  isAdmin: false
              }));
          });

          it('cannot adjust other user settings', () => {
              agent.put(`/api/users/${bert.id}`)
              .send({
                  name: 'Bert the Gert',
              })
              .expect(401);
          });
  });

  it('when not logged in responds with an empty object', () =>
    request(app).get('/api/auth/whoami')
    .expect(200)
    .then(res => expect(res.body).to.eql({}))
    );
});

  describe('POST /logout when logged in', () => {
    const agent = request.agent(app);

    before('log in', () => agent
      .post('/api/auth/local/login')
      .send(alice));

    it('logs you out and redirects to whoami', () => agent
      .post('/api/auth/logout')
      .expect(302)
      .expect('Location', '/api/auth/whoami')
      .then(() =>
        agent.get('/api/auth/whoami')
          .expect(200)
          .then(rsp => expect(rsp.body).eql({}))
      )
  );
  });
});
