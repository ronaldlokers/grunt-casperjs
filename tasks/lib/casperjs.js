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
    
    if (options.engine) {
      command += ' --engine=' + options.engine;
    }

    if (options.pre) {
      command += ' --pre=' + options.pre.join(',');
    }

    if (options.post) {
      command += ' --post=' + options.post.join(',');
    }
	
	  if (options.webSecurity === false) {
      command += ' --web-security=no';
    }

    if (options.proxy) {
      command += ' --proxy='+ options.proxy;
    }

    if (options.proxyType) {
      command += ' --proxy-type='+ options.proxyType;
    }

    if (options.outputEncoding) {
      command += ' --output-encoding='+ options.outputEncoding;
    }

    if (options.sslProtocol) {
      command += ' --ssl-protocol='+ options.sslProtocol;
    }

    if (options.cookiesFile) {
      command += ' --cookies-file='+ options.cookiesFile;
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
