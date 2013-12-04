/*
 * resourceful-test.js: Tests for flatiron app(s) using the resourceful plugin
 *
 * (C) 2011, Nodejitsu Inc.
 * MIT LICENSE
 *
 */

var assert = require('assert'),
    resourceful = require('resourceful'),
    vows = require('vows');

var app = require('../../examples/resourceful-app/app');

vows.describe('flatiron/plugins/resourceful').addBatch({
  "A flatiron app using `flatiron.plugins.resourceful": {
    topic: app,
    "should extend the app correctly": function (app) {
      assert.isObject(app.resources);
      assert.isFunction(app.resources.Creature);
      assert.isFunction(app.define);
    },
    "when initialized": {
      topic: function () {
        app.init(this.callback);
      },
      "it should use the correct engine": function () {
        assert.equal(app.resources.Creature.engine, resourceful.engines.Memory);
      }
    }
  }
}).export(module);