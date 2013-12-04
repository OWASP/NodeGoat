/*
 * time-span-test.js: Tests for the TimeSpan module.
 *
 * (C) Charlie Robbins
 * MIT LICENSE
 *
 */

require.paths.unshift(require('path').join(__dirname, '..', 'lib'));

var vows = require('vows'),
    fs = require('fs'),
    path = require('path'),
    eyes = require('eyes'),
    assert = require('assert'),
    timeSpan = require('time-span');
    
vows.describe('time-span').addBatch({
  "When using the TimeSpan module": {
    "the parse() method": {
      "when passed a TimeSpan string with no days": {
        "should return a valid TimeSpan object": function () {
          var ts = timeSpan.parse("04:03:02.10");
          assert.equal(ts.hours, 4);
          assert.equal(ts.minutes, 3);
          assert.equal(ts.seconds, 2);
          assert.equal(ts.milliseconds, 100);
        }
      },
      "when passed a TimeSpan string with days": {
        "should return a valid TimeSpan object": function () {
          var ts = timeSpan.parse("01:04:03:02.10");
          assert.equal(ts.days, 1);
          assert.equal(ts.hours, 4);
          assert.equal(ts.minutes, 3);
          assert.equal(ts.seconds, 2);
          assert.equal(ts.milliseconds, 100);
        }
      }
    },
    "the test() method": {
      "when passed a TimeSpan string with no days": {
        "should return true": function () {
          assert.isTrue(timeSpan.test("04:03:02.10"));
        }
      },
      "when passed a TimeSpan string with days": {
        "should return true": function () {
          assert.isTrue(timeSpan.test("01:04:03:02.10"));
        }
      },
      "when passed an invalid TimeSpan string": {
        "should return false": function () {
          assert.isFalse(timeSpan.test('xx:00:invalid'));
        }
      }
    }
  }
}).export(module);