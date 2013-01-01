module.exports = function(grunt) {
  'use strict';

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

   grunt.utils.async.forEachSeries(
       filepaths, function(filepath, callback) {
     grunt.helper('casperjs', filepath, options, function(err) {
       if (err) {
         grunt.warn(err);
       }
       callback();
     });
   }, done);
 });

 grunt.registerHelper('casperjs', function(filepath, options, callback) {
   var command = 'casperjs test',
       exec = require('child_process').exec;

   // Add options documented in the following web site:
   //   http://casperjs.org/testing.html
   if (options.xunit) {
     command += ' --xunit=' + options.xunit;
   }
   if (options.direct) {
     command += ' --direct';
   }
   if (options.includes) {
     command += ' --includes=' + options.includes.join(',');
   }
   if (options.logLevel) {
     command += ' --log-level=' + options.logLevel;
   }
   if (options.pre) {
     command += ' --pre=' + options.pre.join(',');
   }
   if (options.post) {
     command += ' --post=' + options.post.join(',');
   }

   command += " " + filepath;

   grunt.log.write("Command: " + command);

   function puts(error, stdout, stderr) {
     grunt.log.write('\nRunning tests from "' + filepath + '":\n');
     grunt.log.write(stdout);
     //grunt.log.error( stderr );

     if ( error !== null ) {
       callback(error);
     } else {
       callback();
     }
   }
   exec(command, puts);
 });
};
