var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  console.log(req.session);

  if(req.session.user) {
    res.render('index', { user: req.session.user });
  } else {
    res.redirect('/login');
  }

});

module.exports = router;
