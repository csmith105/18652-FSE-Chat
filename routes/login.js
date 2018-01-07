var express = require('express');
var router = express.Router();

var sess;
router.route('/')
  .get(function(req, res) {

    console.log('Boop.');

    sess = req.session;

    // If the user is logged in, redirect them to the index
    if(sess.user) {
      res.redirect('/');
    } else {
      res.render('login');
    }

  })
  .post(function (req, res) {
    res.send('Add a book')
  })
;

module.exports = router;
