/*
 * grunt-casperjs
 * https://github.com/ronaldlokers/grunt-casperjs
 *
 * Copyright (c) 2013 Ronald Lokers
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var casperjs = require('./lib/casperjs').init(grunt).casperjs;

  grunt.registerMultiTask('casperjs', 'Run CasperJs tests.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var done = this.async(),
        filepaths = [], 
        options = grunt.util._.defaults(this.options(), {async: 'series'}),
        asyncEnabled = ['series', 'parallel'].indexOf(options.async) > -1,
        asyncLoop = options.async === 'parallel' ? 'forEach' : 'forEachSeries';

    // support option async parallel for backwards compatibility: {async: {parallel: true}}
    if (options.async && options.async.parallel) {
      asyncEnabled = true;
      asyncLoop = 'forEach';
    }

    // Get rid of the async options since they're unrelated to casper/phantom
    delete options.async;

    // Iterate over all specified file groups.
    this.files.forEach(function(file) {
      // Concat specified files.
      file.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          filepaths.push(filepath);
          return true;
        }
      });
    });

    var executeTests = function(filepath, callback) {
      casperjs(filepath, options, function(err) {
        if (err) {
          grunt.warn(err);
        }
        callback();
      });
    };

    if (asyncEnabled) {
      grunt.util.async[asyncLoop](filepaths, executeTests, done);
    } else {
      executeTests(filepaths, done);
    }
  });

};
