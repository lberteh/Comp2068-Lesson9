var express = require('express');
var router = express.Router(); // interpret url request

// reference the Game model
var Game = require('../models/game');

// auth check
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  }
  else {
    res.redirect('/login');
  }
}

// GET handler for /games
router.get('/', isLoggedIn, function(req, res, next) {
    // use Game model to run a query
    Game.find(function(err, games) {
        if(err) {
          console.log(err);
          res.render('error');
        }
        else {
          // load the games view
          res.render('games', {
              title: 'Video Games',
              games: games,
              user: req.user
          });
        }
    });
});

// GET /games/add - display empty Game form
router.get('/add', isLoggedIn, function(req, res, next){ // I don't need to put games/add because games is already setup in the app.js
    res.render('add-game', {
      title: 'Add a new Game',
      user: req.user
    });
});

// Post /games/add - process form submission
router.post('/add', function(req, res, next){
    Game.create({
      title: req.body.title,
      publisher: req.body.publisher,
      genre: req.body.genre,
      year: req.body.year
    }, function(err, Game){
        if(err) {
          console.log(err);
          res.render('error', {
            message: 'Failed to add game',
            error: err
          });
        }
        else {
          res.redirect('/games');
        }
    })
});

// GET /games/delete/:_id - run a delete
router.get('/delete/:_id', isLoggedIn, function(req,res,next) {
    // read the id value from the url
    var _id = req.params._id;

    // use mongoose to delete this game
    Game.remove({ _id: _id}, function(err) {
        if(err) {
           console.log(err);
           res.render('error', {message: 'Delete Error', user: req.user});
        }
        else {
           res.redirect('/games');
        }
    })
});

// GET /games/:_id - go to edit page
router.get('/:_id', isLoggedIn, function(req, res, next) {
    // get the id from the url
    var _id = req.params._id;

    // look up the selected Game document with this _id
    Game.findById(_id, function(err, game) {
        if(err) {
            console.log(err);
            res.render('error', {message: 'Game not found', user: req.user});
        } else {
          res.render('edit-game', {
            title: 'Edit Game',
            game: game,
            user: req.user
          });
        }
    })

//POST /games/:_id - save form to process game updates
router.post('/:_id', isLoggedIn, function(req, res, next) {
    // get id from the url
    var _id = req.params._id;

    // instantiate a new game object and instantiate it from the form
    var game = new Game( {
      _id: _id,
      title: req.body.title,
      publisher: req.body.publisher,
      genre: req.body.genre,
      year: req.body.year
    });

    // save the update using mongoose
    Game.update( { _id: _id }, game, function(err) {
        if(err) {
            console.log(err);
            res.render('error', {message: 'Update failed'});
        } else {
            res.redirect('/games');
        }
    })

});

})

// make controller public
module.exports = router;
