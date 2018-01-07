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

    var username = req.body.username;
    var password = req.body.password;

    // Check database

    res.render('success', {
      strong: username,
      message: ' successfully registered.'
    });
  })
;

module.exports = router;
