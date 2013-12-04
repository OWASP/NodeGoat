/*
 * watch-test.js: Tests for restarting forever processes when a file changes.
 *
 * (C) 2010 Nodejitsu Inc.
 * MIT LICENSE
 *
 */

var assert = require('assert'),
    path = require('path'),
    fs = require('fs'),
    vows = require('vows'),
    fmonitor = require('../../lib');

var watchDir = fs.realpathSync(path.join(__dirname, '..', 'fixtures', 'watch')),
    monitor;

vows.describe('forever-monitor/plugins/watch').addBatch({
  'When using forever with watch enabled': {
    'forever should': {
      topic: fmonitor.start('daemon.js', {
        silent: true,
        options: ['-p', '8090'],
        watch: true,
        sourceDir: path.join(__dirname, '..', 'fixtures', 'watch')
      }),
      'have correct options set': function (child) {
        monitor = child;
        assert.isTrue(child.watchIgnoreDotFiles);
        assert.equal(watchDir, fs.realpathSync(child.watchDirectory));
      },
      'read .foreverignore file': {
        'and store ignore patterns': function (child) {
          assert.deepEqual(
            child.watchIgnorePatterns,
            fs.readFileSync(
              path.join(watchDir, '.foreverignore'),
              'utf8'
            ).split("\n").filter(Boolean)
          );
        }
      },
      'when file changes': {
        topic: function (child) {
          child.once('restart', this.callback);
          fs.writeFileSync(path.join(watchDir, 'file'), '// hello, I know nodejitsu.');
        },
        'restart the script': function (child, _) {
          fs.writeFileSync(path.join(watchDir, 'file'), '/* hello, I know nodejitsu. */');
        }
      },
    }
  }
}).addBatch({
  'When using forever with watch enabled': {
    'when file is added': {
      topic: function () {
        monitor.once('restart', this.callback);
        fs.writeFileSync(path.join(watchDir, 'newFile'), '');
      },
      'restart the script': function (child, _) {
        fs.unlinkSync(path.join(watchDir, 'newFile'));
      }
    }
  }
}).addBatch({
  'When using forever with watch enabled': {
    'when file is removed': {
      topic: function () {
        monitor.once('restart', this.callback);
        try { fs.unlinkSync(path.join(watchDir, 'removeMe')) }
        catch (ex) { }
      },
      'restart the script': function (child, _) {
        fs.writeFileSync(path.join(watchDir, 'removeMe'), '');
      }
    }
  }
}).addBatch({
  'When using forever with watch enabled': {
    'when file in ignored dir is updated': {
      topic: function (child) {
        fs.writeFileSync(path.join(watchDir, 'ignore_newFile'), '');
        child.once('watch:ignore', this.callback);
      },
      'do nothing': function (child, _) {
        fs.unlinkSync(path.join(watchDir, 'ignore_newFile'));
      }
    }
  }
}).export(module);
