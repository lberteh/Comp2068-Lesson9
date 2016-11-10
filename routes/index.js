var express = require('express');
var router = express.Router();
var passport = require('passport');

// link to the Account model
var Account = require('../models/account');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Lesson 9 - Passport part 2',
    message: 'Authentication with Passport',
    user: req.user
});
});

/* GET register page */
router.get('/register', function(req, res, next) {
  res.render('register', {
    title: 'Register',
    user: req.user
  })
});

/* POST register page */
router.post('/register', function(req, res, next) {
  // use passport and the Account model to save the new user
  Account.register (new Account ({
    username: req.body.username
  }), req.body.password, function(err, account) {
    if (err) {
      console.log(err);
      res.render('error');
    }
    else {
      res.redirect('/login');
    }
  });
});

/* GET login page */
router.get('/login', function(req, res, next) {
  // get session messages if there are any
  var messages = req.session.messages || [];
  
  // clear the messages out
  req.session.messages = [];

  res.render('login', {
    title: 'Login',
    messages: messages,
    user: req.user
  });

});

/* POST login page */
router.post('/login', passport.authenticate('local', {
  successRedirect: '/games',
  failureRedirect: '/login',
  failureMessage: 'Invalid Login' // stored in the session messages
}));

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/login');

});

module.exports = router;
