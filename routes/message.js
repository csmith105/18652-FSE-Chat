var express = require('express');
var router = express.Router();

router.route('/messages')
  .get(function(req, res) {
    
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
;

module.exports = router;
