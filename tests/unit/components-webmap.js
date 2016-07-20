define(function(require) {
  var registerSuite = require('intern!object');
  var assert = require('intern/chai!assert');

  var webmap = require('app/components/webmap').default;

  var node;
  var view;

  registerSuite({
    name: 'components/webmap',
    setup: function() {
    },
    beforeEach: function() {
      node = document.createElement('div');
      document.body.appendChild(node);
    },
    afterEach: function() {
      view.destroy();
    },
    teardown: function() {
    },
    'Will create a MapView': function() {
      var options = {
        params: {
          center: [43, -118]
        },
        node: node
      };
      view = webmap.create(options);
      assert.equal(view.center.latitude, -118);
      assert.equal(view.center.longitude, 43);
    },
    'Adds MapView to DOM': function() {
      var options = {
        params: {},
        node: node
      };
      view = webmap.create(options);
      var elem = document.querySelector('.view-div');
      assert.isOk(elem);
    }
  });
});
