import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Controller.extend({
  username: null,
  password: null,
  response: null,

  disabled: function() {
    return Ember.empty(this.get('username')) || Ember.empty(this.get('password'));
  }.property('username', 'password'),

  actions: {
    signIn: function() {
      var self = this;

      ajax('/session', {
        type: 'POST',
        data: this.getProperties('username', 'password')
      }).then(function(response) {
        self.set('response', response);
      });
    }
  }

});
