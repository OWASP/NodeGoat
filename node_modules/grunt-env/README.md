# grunt-env [![Build Status](https://secure.travis-ci.org/jsoverson/grunt-env.png?branch=master)](http://travis-ci.org/onehealth/grunt-env)

Specify an ENV configuration as a task, e.g.

```
grunt.registerTask('dev', ['env:dev', 'lint', 'server', 'watch']);
grunt.registerTask('build', ['env:build', 'lint', 'other:build:tasks']);
```

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-env`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-env');
```

[grunt]: http://gruntjs.com/
[getting_started]: https://github.com/gruntjs/grunt/blob/master/docs/getting_started.md

## Configuration

```js
  env : {
    options : {
 	//Shared Options Hash
    },
    dev : {
      NODE_ENV : 'development',
      DEST     : 'temp'
    },
    build : {
      NODE_ENV : 'production',
      DEST     : 'dist',
      concat   : {
        PATH     : {
          'value': 'node_modules/.bin',
          'delimiter': ':'
        }
      }
    },
    functions: {
      BY_FUNCTION: function() {
        var value = '123';
        grunt.log.writeln('setting BY_FUNCTION to ' + value);
        return value;
      }
    }
  }
```
## Using external files

You can specify environment values in INI or JSON style and load them via the src option.

```js
  env : {
    dev : {
      src : "dev.json"
    },
    heroku : {
      src : ".env"
    }
  }
```

## Using envdir

You can specify files to read environment variables from, similar to the daemontools [envdir](http://cr.yp.to/daemontools/envdir.html) utility.

```js
  env : {
    dev : {
      src : ["envdir/*"],
      options: {
        envdir: true
      }
    }
  }
```

## Dynamic ENV configuration

The following directives can be specified in the `options` to alter the environment in more specific ways

- `add`
  - This will add the variables *only* if they don't already exist
- `replace`
  - Will replace the variable with the value specified
- `unshift`
  - Will prepend the value to the variable specified, optionally specifying a 'delimiter'
- `push`
  - Same as unshift, but at the end of the value.
- `concat`
  - Functionally same as `push`, added for readability

```
yourtask : {
  USER : 'you',
  PATH : '/bin:/usr/bin'

  options : {
    add : {
      VERBOSE : '1' // will only be added if VERBOSE isn't already set
    },
    replace : {
      USER : 'me'
    },
    push : {
      PATH : {
        value : '~/bin',
        delimiter : ':'
      }
    },
    unshift : {
      PATH : '/sbin:'
    }
  }
}
```

## Important note on data types

Environment variables are strings only. If you attempt to assign complex objects, they will be converted to strings.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History

- 0.4.0 Removed automatic parse, added ability to add ini or json style `src` files
- 0.3.0 Automatically parses .env files now
- 0.2.1 fixed npm install
- 0.2.0 grunt 0.4.0 support, simplified
- 0.1.0 Initial release

## License

Licensed under the Apache 2.0 license.

## Author

Jarrod Overson
