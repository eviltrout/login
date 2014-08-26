import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;
var server;

function parsePostData(query) {
  var result = {};
  query.split("&").forEach(function(part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}

module('Integration - Login', {
  setup: function() {
    App = startApp();
    server = new Pretender(function() {
      this.post("/session", function(request) {
        var data = parsePostData(request.requestBody);

        if (data.password === "secret") {
          return [200, {"Content-Type": "application/json"}, JSON.stringify({success: true})];
        } else {
          return [200, {"Content-Type": "application/json"}, JSON.stringify({failure: true})];
        }
      });
    });
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test("It can login successfully", function() {
  visit("/");
  fillIn(".test-username", "Evil Trout");
  fillIn(".test-password", "secret");
  click(".form-signin button");

  andThen(function() {
    equal(find('.alert-success').length, 1, "it shows the success messsage");
  });
});

test("It can fail", function() {
  visit("/");
  fillIn(".test-username", "Evil Trout");
  fillIn(".test-password", "wrong password");
  click(".form-signin button");

  andThen(function() {
    equal(find('.alert-info').length, 1, "it shows the failure messsage");
  });
});
