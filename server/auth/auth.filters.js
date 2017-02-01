const mustBeLoggedIn = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('You must be logged in');
  }
  next();
};

const selfOnly = action => (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return res.status(403).send(`You can only ${action} yourself.`);
  }
  next();
};

const forbidden = message => (req, res, next) => {
  if (req.user.isAdmin) next(); // If they are an admin, proceed
  else res.status(403).send(message);
};

const selfOrAdminOnly = action => (req, res, next) => {
  // Only allow if the user is an admin or the user themself
  if (req.user && req.params && (req.user.isAdmin || (+req.params.userId === +req.user.id))) {
    next();
  } else {
    res.status(401).send(`You can only perform: '${action}' if you are the user or an admin`);
  }
};


module.exports = { mustBeLoggedIn, selfOnly, forbidden, selfOrAdminOnly };
