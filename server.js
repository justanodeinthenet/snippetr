var express = require('express')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , passport = require('passport')
  , bcrypt = require('bcrypt')
  , SALT_WORK_FACTOR = 10
  , app = express();

mongoose.connect('mongodb://localhost/snippets_db');
/* */
app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: '#234*^%^*21nc7471' }));
  app.use( function (req, res, next) {
    if ( req.method == 'POST' && req.url == '/login' ) {
      if ( req.body.rememberme ) {
        req.session.cookie.maxAge = 2592000000;
      } else {
        req.session.cookie.expires = false;
      }
    }
    next();
  });
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'client')));
  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }
});

require('./server/config/passport');
require('./server/models/snippet');
require('./server/models/user');
require('./server/config/routes')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});