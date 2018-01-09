var express = require('express');
var router = express.Router();
var dateFormat = require('dateformat');

router.route('/').get(function(req, res) {

  if(req.session.user) {

    Message.findAll({
      include: [{
        model: User,
        attributes: ['username']}] }).then(function(messages) {

      if(messages) {

        var payload = [];

        console.log(messages);

        for(index = 0; index < messages.length; ++index) {
          payload[index] = {};
          payload[index].username = messages[index].User.dataValues.username;
          payload[index].content = messages[index].dataValues.content;
          payload[index].timestamp = dateFormat(messages[index].dataValues.createdAt, "mm.dd.yyyy h:MM TT");;
        }

        // Return all messages as JSON
        res.json(payload);

      } else {
        res.json({});
      }


    });

  } else {
    res.json({"error": "login"});
  }

}).post(function (req, res) {

  if(req.session.user) {

    Message.create({
      UserId: req.session.user.id,
      content: req.body.content
    }).then(function(message) {
      res.json({"result": "success"});
    });

  } else {
    res.json({"error": "login"});
  }

});

module.exports = router;
