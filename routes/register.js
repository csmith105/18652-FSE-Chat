var express = require('express');
var router = express.Router();

var sess;
router.route('/')
  .get(function(req, res) {

    sess = req.session;

    // If the user is logged in, redirect them to the index
    if(sess.user) {
      res.redirect('/');
    } else {
      res.render('register');
    }

  })
  .post(function (req, res) {

    // Get POST values
    var post_username = req.body.username;
    var post_password = req.body.password;

    // Check database
    User.findOne({ where: { username: post_username } }).then(function(db_user) {

      if(db_user === null) {

        // No existing user found, create one
        User.create({
          username: post_username,
          password: post_password
        });

        // Render the success dialog
        res.render('success', {
          strong: post_username,
          message: ' successfully registered.'
        });

      } else {

        // Render the failure dialog
        res.render('failure', {
          strong: post_username,
          message: ' is already registered.'
        });

      }

    })


  })
;

module.exports = router;
