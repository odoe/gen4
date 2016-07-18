define(function(require) {
  var registerSuite = require('intern!object');
  var assert = require('intern/chai!assert');

  var MapView = require('esri/views/MapView');

  var webmap = require('app/components/webmap').default;

  var node = document.createElement('div');
  document.body.appendChild(node);

  registerSuite({
    name: 'components/webmap',
    setup: function() {
    },
    beforeEach: function() {
      node = document.createElement('div');
      document.body.appendChild(node);
    },
    afterEach: function() {
    },
    teardown: function() {
      view.destroy();
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
      webmap.create(options);
      var elem = document.querySelector('.view-div');
      assert.isOk(elem);
    }
  });
});
