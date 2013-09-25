
var user = require('../controllers/user')
  , snippet = require('../controllers/snippet')
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

  // app.get('/api/*', ensureAuthenticated);
  app.get('/api/users', ensureAuthenticated, user.list);
  app.get('/api/users/:id', ensureAuthenticated, user.find);
  app.post('/api/users', user.register);
  app.put('/api/users/:id', ensureAuthenticated, user.edit);
  app.delete('/api/users/:id', ensureAuthenticated, user.delete);

  app.get('/api/snippets', snippet.list);
  // app.get('/api/snippets/:id', snippet.find);
  app.get('/api/snippets/:id', snippet.search);
  app.post('/api/snippets', snippet.add);
  app.put('/api/snippets/:id', ensureAuthenticated, snippet.edit);
  app.delete('/api/snippets/:id', ensureAuthenticated, snippet.delete);
};

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.send(401);
  }
}