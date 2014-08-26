import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

module('Integration - Login', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
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
