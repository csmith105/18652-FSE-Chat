var express = require('express');
var router = express.Router();

router.route('/').get(function(req, res) {

  // If the user is logged in, redirect them to the index
  if(req.session.user) {
    res.redirect('/');
  } else {
    res.render('login');
  }

}).post(function (req, res) {

  // Get POST values
  var post_username = req.body.username;
  var post_password = req.body.password;

  // Check database
  User.findOne({ where: { username: post_username } }).then(function(db_user) {

    if(db_user === null) {

      // Render the failure dialog
      res.render('failure', {
        strong: post_username,
        message: ' is not registered.'
      });

    } else if (db_user.password === post_password) {

      req.session.user = {
        id: db_user.id,
        username: db_user.username
      };

      req.session.save();

      res.render('success', {
        strong: req.session.user.username,
        message: ' successfully logged in.'
      });

    } else {

      // Render the failure dialog
      res.render('failure', {
        strong: 'Login Failure:',
        message: ' password incorrect.'
      });

    }

  })
});

module.exports = router;
