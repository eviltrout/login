import Ember from 'ember';

var Router = Ember.Router.extend({
  location: LoginENV.locationType
});

Router.map(function() {
  this.resource('login');
});

export default Router;
