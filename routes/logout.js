var express = require('express');
var router = express.Router();

router.route('/').get(function(req, res) {

  // If the user is logged in, redirect them to the index
  if(req.session.user) {

    var username = req.session.user.username;

    // Destroy Session
    req.session.destroy();

    res.render('success', {
      strong: username,
      message: ' successfully logged out.'
    });

  } else {

    res.render('failure', {
      strong: 'Logout Failure:',
      message: ' You are already logged out.'
    });

  }

});

module.exports = router;
