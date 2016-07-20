define(function(require) {
  var registerSuite = require('intern!object');
  var assert = require('intern/chai!assert');
  var td = require('testdouble');

  var datalist = require('app/components/datalist');
  var store = require('app/stores/app').default;

  var factory = datalist.default;
  var whenViewReady = datalist.whenViewReady;
  var updateMemory = datalist.updateMemory;
  var selectHandler = datalist.selectHandler;
  var createList = datalist.createList;
  var facilitySort = datalist.facilitySort;

  var node = document.createElement('div');
  document.body.appendChild(node);
  registerSuite({
    name: 'components/datalist',
    setup: function() {
      td.replace(store, 'getAllItems');
      td.replace(store, 'addToUI');
      td.replace(store, 'zoomToItem');
    },
    beforeEach: function() {
    },
    afterEach: function() {
    },
    teardown: function() {
      td.reset();
    },
    'whenViewReady - adds to UI and gets items': function() {
      var container = {};
      whenViewReady(container)();
      td.verify(store.addToUI({ elem: container, position: 'bottom-right' }));
      td.verify(store.getAllItems('tri'));
    },
    'updateMemory - update collection of a list and sort': function() {
      var list = {
        set: td.function()
      };
      var memory = {};
      updateMemory(list)(memory);
      td.verify(list.set('collection', memory));
      td.verify(list.set('sort', td.matchers.anything()));
    },
    'facilitySort - sort method for facilities': function() {
      var a = { n: 'Bill' };
      var b = { n: 'Sam' };
      var first = facilitySort('n')(a, b);
      var second = facilitySort('n')(b, a);
      var third = facilitySort('n')(b, b);
      assert.strictEqual(first, -1);
      assert.strictEqual(second, 1);
      assert.strictEqual(third, 0);
    },
    'selectHandler - zoom to selected row': function() {
      var data = {};
      selectHandler({ rows: [{ data: data }] });
      td.verify(store.zoomToItem('tri', data));
    },
    'createList - creates a Grid object with a single column': function() {
      var list = createList(node);
      assert.isOk(list);
      assert.equal(list.get('columns').length, 1);
    }
  });
});
