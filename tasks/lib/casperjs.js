var path = require('path')

exports.init = function(grunt) {
  var exports = {};

  exports.casperjs = function(filepath, options, callback, index) {

    var command = path.join(__dirname, '..', '..', 'casperjs'),
        args = ['test'],
        spawn = require('child_process').spawn,
        phantomBinPath = require('phantomjs').path;

    // Check for xunit and make result files unique
    var casperjsOptionsCopy = options.casperjsOptions.slice(0);
    if (casperjsOptionsCopy && casperjsOptionsCopy.length > 0) {
        if (index) {
          for (var i = 0; i < casperjsOptionsCopy.length; i++) {
            if (casperjsOptionsCopy[i].match(/xunit/)) {
              casperjsOptionsCopy[i] = casperjsOptionsCopy[i].replace('.xml','-'+index+'.xml');
            }
          }
        }
        args = args.concat(casperjsOptionsCopy);
    }

    args.push(filepath);

    grunt.log.writeln("Command: " + command);

    process.env["PHANTOMJS_EXECUTABLE"] = phantomBinPath;

    grunt.log.write('\nRunning tests from "' + filepath + '":\n');

    grunt.util.spawn({
      cmd: command,
      args: args,
      opts: {
        // pipe stdout/stderr through
        stdio: 'inherit'
      }
    }, function(error, stdout, code) {
      callback(error);
    });

  };

  return exports;
};
