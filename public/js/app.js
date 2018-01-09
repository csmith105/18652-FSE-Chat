var message = new Vue({
  el: '#app',
  data: {
    newMessage: "",
    items: ""
  },
  methods: {
    postMessage: function(e) {

      var app = this;

      // Only on "enter" key
      if (e.keyCode === 13) {

        console.log("Message Posted");

        axios.post('/message', {
          content: this.newMessage,
        }).then(function(res) {
          console.log(res);
          app.newMessage = '';
        }).catch(function(error) {
          console.log("Error");
          app.newMessage = 'Error';
        });

      }
    },
    loadData: function() {

      var app = this;

      axios.get('/message', {}).then(function(res) {
        console.log(res);
        app.items = res;
      }).catch(function(error) {
        console.log("Error");
      });

    }
  },
  mounted: function () {
    this.loadData();

    setInterval(function () {
      this.loadData();
    }.bind(this), 500);
  }
});
