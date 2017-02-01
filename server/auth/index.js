const auth = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../../db').model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(
  (id, done) => {
    User.findById(id)
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        done(err);
      });
  }
);

passport.use(new (LocalStrategy)(
  (email, password, done) => {
    User.findOne({ where: { email } })
    .then(user => {
      if (!user) {
        return done(null, false, { message: 'Login incorrect' });
      }
      return user.authenticate(password)
        .then(ok => {
          if (!ok) {
            return done(null, false, { message: 'Login incorrect' });
          }
          done(null, user);
        });
    })
    .catch(done);
  }
));

auth.get('/whoami', (req, res) => res.send(req.user));

auth.post('/:strategy/login', (req, res, next) => {
  passport.authenticate(req.params.strategy, {
    successRedirect: '/'
  })(req, res, next);
});

auth.post('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/api/auth/whoami');
});

// Rolling my own. Leaving this in for now, just in case.
// auth.post('/local/login', function (req, res, next) {
//   User.findOne({
//     where: {
//       email: req.body.username
//     }
//   })
//   .then(user => {
//     console.log(user);
//     if (!user) {
//       res.sendStatus(401);
//     } else {
//       return user.authenticate(req.body.password)
//       .then(ok => {
//         if (!ok) {
//           res.send('Ugh');
//         } else {
//           req.logIn(user, function (err) {
//             if (err) return next(err);
//             res.json(user);
//           });
//         }
//       });
//     }
//   })
//   .catch(next);
// });

module.exports = auth;
