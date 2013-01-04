module.exports = function(grunt) {
  'use strict';
  
  var casperjs = require('./lib/casperjs').init(grunt).casperjs;

  // Create a new multi task.
  grunt.registerMultiTask('casperjs', 'This triggers casperjs.', function() {
    // Tell grunt this task is asynchronous.
    var done = this.async(),
        files = grunt.file.expandFiles(this.file.src),
        filepaths = [],
        helpers = require('grunt-contrib-lib').init(grunt),
        options = helpers.options(this);

    grunt.verbose.writeflags(options, 'Options');

    grunt.file.expandFiles(this.file.src).forEach(function(filepath) {
      filepaths.push(filepath);
    });

    grunt.util.async.forEachSeries(
      filepaths, function(filepath, callback) {
        casperjs(filepath, options, function(err) {
          if (err) {
            grunt.warn(err);
          }
          callback();
        });
      }, 
    done);
  });
};
