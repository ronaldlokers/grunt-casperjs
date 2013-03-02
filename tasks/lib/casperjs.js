exports.init = function(grunt) {
  var exports = {};
  
  exports.casperjs = function(filepath, options, callback) {

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

      if ( error !== null ) {
        callback(error);
      } else {
        callback();
      }
    }

    exec(command, puts);
    
  };
  
  return exports;
};