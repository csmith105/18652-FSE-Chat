var message = new Vue({
  el: '#app',
  data: {
    messages: "",
    items: ""
  },
  methods: {
    postMessage: function(e) {

      var app = this;

      // Only on "enter" key
      if (e.keyCode === 13) {

        console.log("Message Posted");

        axios.post('/message', {
          content: this.messages,
        }).then(function(res) {
          console.log(res);
          app.messages = '';
        }).catch(function(error) {
          console.log("Error");
          app.messages = 'Error';
        });

      }
    },
    loadData: function() {

      var app = this;

      // If we have previous messages, only request new ones
      if(this.items && this.items.length > 0) {

        // Get only new messages

        var lastMessage = this.items[this.items.length - 1];
        var timestamp = lastMessage.timestamp;

        axios.get('/message?t=' + timestamp, {}).then(function(res) {

          console.log(res.data);

          if(res.data.length > 0) {

            app.items = app.items.concat(res.data);

          }


        }).catch(function(error) {
          console.log("Error 1");
          console.log(error);
        });

      } else {

        // Get all messages

        axios.get('/message', {}).then(function(res) {

          app.items = res.data;

        }).catch(function(error) {
          console.log("Error 2");
          console.log(error);
        });

      }

    }
  },
  updated() {
      // Adapted from https://stackoverflow.com/questions/18614301/keep-overflow-div-scrolled-to-bottom-unless-user-scrolls-up
      $('#message-comp').scrollTop($('#message-comp')[0].scrollHeight);
  },
  mounted: function () {

    // Initial query of the server
    this.loadData();

    // Call the scroll watch function
    //this.watch.messages();

    // Pull from server every so often
    setInterval(function () {
      this.loadData();
    }.bind(this), 500);
  }
});
