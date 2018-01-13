var express = require('express');
var router = express.Router();
var dateFormat = require('dateformat');

router.route('/').get(function(req, res) {

  if(req.session.user) {

    var post_timestamp = req.query.t;

    console.log(post_timestamp);

    if(post_timestamp) {

      console.log("Timestamp found");

      // Send only messages posted after the given timestamp

      Message.findAll({
        where: {
          createdAt: { gt: post_timestamp }
        },
        include: [{
          model: User,
          attributes: ['username']}] }).then(function(messages) {

          if(messages) {

            var payload = [];

            for(index = 0; index < messages.length; ++index) {
              payload[index] = {};
              payload[index].username = messages[index].User.dataValues.username;
              payload[index].content = messages[index].dataValues.content;
              payload[index].time = dateFormat(messages[index].dataValues.createdAt, "mm.dd.yyyy h:MM TT");
              payload[index].timestamp = messages[index].dataValues.createdAt;
            }

            // Return all messages as JSON
            res.json(payload);

          } else {
            res.json({});
          }

      });

    } else {

      // Send all messages

      Message.findAll({
        include: [{
          model: User,
          attributes: ['username']}] }).then(function(messages) {

          if(messages) {

            var payload = [];

            for(index = 0; index < messages.length; ++index) {
              payload[index] = {};
              payload[index].username = messages[index].User.dataValues.username;
              payload[index].content = messages[index].dataValues.content;
              payload[index].time = dateFormat(messages[index].dataValues.createdAt, "mm.dd.yyyy h:MM TT");
              payload[index].timestamp = messages[index].dataValues.createdAt;
            }

            // Return all messages as JSON
            res.json(payload);

          } else {
            res.json({});
          }

      });

    }

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
