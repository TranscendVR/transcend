const auth = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('../db').model('users');

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

// Local signup
auth.post('/local/signup', (req, res, next) => {
  User.create(req.body)
  .then(user => res.status(201).json(user))
  .catch(next);
});

// Local login
auth.post('/local/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/vr',
    failureRedirect: '/login'
  })(req, res, next);
});

// Local login cont.
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
          console.log('USER IS: ', user);
          done(null, user);
        });
    })
    .catch(done);
  }
));

// Google OAuth
auth.get('/google/login',
  passport.authenticate('google', {
    scope: 'email'
  })
);

// Google OAuth cont.
passport.use(
  new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
  },
  // Google will send back the token and profile
  function (token, refreshToken, profile, done) {
    // Google sends back info
    const info = {
      name: profile.displayName,
      email: profile.emails[0].value
    };
    // Put info in db
    User.findOrCreate({
      where: {
        googleId: profile.id
      },
      defaults: info
    })
    .spread(user => {
      done(null, user);
    })
    .catch(done);
  })
);

// Google OAuth cont. - handle the callback after Google has authenticated the user
auth.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/vr',
    failureRedirect: '/login'
  })
);

// Send user info to frontend
auth.get('/whoami', (req, res) => res.send(req.user));

auth.post('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/api/auth/whoami');
});

module.exports = auth;
