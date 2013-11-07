# grunt-casperjs

> With this grunt.js task you can run tests with CasperJS.

## Getting Started

First [Install CasperJS](http://casperjs.org/installation.html).

This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-casperjs --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-casperjs');
```

## The "casperjs" task

### Overview
In your project's Gruntfile, add a section named `casperjs` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  casperjs: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    }
  }
})
```

### Usage Examples

#### Default Options

```js
grunt.initConfig({
  casperjs: {
    options: {
      async: 'series'
    },
    files: ['tests/casperjs/**/*.js']
  },
})
```

#### Async Options

Async options allow tests to run in separate casperjs processes asynchronously. By default, tests are run in series, but if your tests are independent, you can run them in parallel.

```javascript
casperjs: {
  options: {
    async: 'parallel'
  },
  files: ['tests/casperjs/**/*.js']
}
```

If you specify `async: 'none'`, all tests will be executed in a single casperjs process. This is useful if you want options to apply to all tests at once. For example, using `pre` would execute a script before all tests are run, otherwise it would execute the script before each test is run. This is also helpful for aggregating all results into a single xml file with `xunit` option.

```javascript
casperjs: {
  options: {
    async: 'none',
    pre: 'tests/casperjs/init.js',
    xunit: 'results.xml'
  },
  files: ['tests/casperjs/**/test-*.js']
}
```

#### Install script and CasperJS version
The install.js script is responsible for searching for existing CasperJS installations in the path. If found, as of grunt-casperjs v1.2.0, that version of CasperJS will be used. If not found, a stable version of CasperJS will be installed (under review).

grunt-casperjs was tested with the currently stable version of CasperJS, 1.1.x

**If you would like to use a different version of casperjs**, install it yourself globally before installing grunt-casperjs. It will use that one.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).


## CHANGELOG
* 1.3.0 Bump to using the latest version of CasperJs
* 1.2.1 CasperJS installations in path will be used
* 1.2.0 Cleaner fix for installing grunt
* 1.1.2 Fix for windows installation
* 1.1.1 Use latest version of PhantomJS ~1.9
* 1.0.10 Fix env-vars dumping
* 1.0.9 If user has local casperjs, use that first.
* 1.0.7 Options to run tests in parallel
* 1.0.5 Changelog started :)
