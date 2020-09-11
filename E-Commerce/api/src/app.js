const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('./db.js');
const cookieParser = require('cookie-parser');
const routes = require('./routes/index.js');
const cors = require('cors');

require('./db.js');

// PASSPORT //
passport.use(new Strategy(
  function(username, password, done) {
    User.findOne({
      where: { username: username }
    }).then((u) => {
        if(!u) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        console.log(u);
        if(!u.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        
        return done(null, u);
      })
    .catch(err => {
      return done(err);
    })
}));

// PASSPORT GOOGLE //
passport.use(new GoogleStrategy({
  clientID: "131133134087-jenbs9aek3s720nn0sh4arbvjiofulei.apps.googleusercontent.com",
  clientSecret: "549_TZ3GbBCRJI-KKH2Q123O",
  callbackURL: "http://localhost:3000/users/google/callback"
},
  function(accessToken, refreshToken, profile, done) {
    console.log(profile, 'asdaddasdadas');
    const user = profile;
    User.findOrCreate({
      where: { 
        email: user.emails[0].value,
        lastName: user.name.familyName,
        name: user.name.givenName,
        password: user._json.sub,
        username: user.emails[0].value,
        address: 'none',
        image: user._json.picture

      },
    })
      .then(res => res[0])
      .then(user => done(null, user))
      .catch(err => done(err));
  },
));







////////////////////////////////////////




passport.serializeUser(function(u, done) {
  done(null, u.id);
});
  
passport.deserializeUser(function(id, done) {
  User.findByPk(id)
  .then((u) => {
      done(null, u);
    })
    .catch(err => {
      return done(err);
    })
  
});

////////////////////////////////////////////////////////
///////////////////////////////////////////////////////


const server = express();

server.name = 'API';




server.use(require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

server.use(passport.initialize());
server.use(passport.session());

server.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

server.use(cookieParser());
server.use(morgan('dev'));
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
// server.use(cors())
server.use('/', routes);

server.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: [
      'profile',
      'email',
    ],
  }),
);

server.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),(req,res) => {
    res.send(req.user);
  }
);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});



module.exports = server;
