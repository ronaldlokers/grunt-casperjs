module.exports = function(grunt) {
  'use strict';
  
  var casperjs = require('./lib/casperjs').init(grunt).casperjs;

  // Create a new multi task.
  grunt.registerMultiTask('casperjs', 'This triggers casperjs.', function() {
    // Tell grunt this task is asynchronous.
    var done = this.async(),
        filepaths = [],
        helpers = require('grunt-contrib-lib').init(grunt),
        options = helpers.options(this);

    grunt.verbose.writeflags(options, 'Options');

    // grunt 0.3.x
    if (this.file) {
      grunt.file.expandFiles(this.file.src).forEach(function(filepath) {
        filepaths.push(filepath);
      });

    // grunt 0.4.x
    } else {
      this.files.forEach(function(file) {
        filepaths.push(file.src);
      });
    }
    
    // grunt.utils changed to grunt.util in 0.4.x
    var async = (grunt.util || grunt.utils).async;

    async.forEachSeries(
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
