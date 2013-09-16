
var user = require('../controllers/user')
  , passport = require('passport');

module.exports = function(app){
  app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err) }
      if (!user) {
        req.session.messages =  [info.message];
        return res.send(401);
      }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        res.cookie('token', user.accessToken);
        return res.send(200);
      });
    })(req, res, next);
  });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  app.get('/loggedin', function(req, res){
    res.send(req.isAuthenticated() ? req.user : '0');
  });

  // app.get('/', ensureAuthenticated)
  app.get('/api/*', ensureAuthenticated);
  app.get('/api/users', user.list);
  app.get('/api/users/:id', user.find);
  app.post('/api/users', user.register);
  app.put('/api/users/:id', user.edit);
  app.delete('/api/users/:id', user.delete);
};

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.send(401);
  }
}