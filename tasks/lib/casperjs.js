var path = require('path');
var fs = require('fs');

exports.init = function(grunt) {
  var exports = {};

  exports.casperjs = function(filepath, options, callback, index) {

    var command = "./node_modules/casperjs/bin/casperjs";
    if (!fs.existsSync(command)) {
      command = path.join(__dirname, '..', '..', 'node_modules', '.bin', 'casperjs');
      if (!fs.existsSync(command)) {
        command = path.join(__dirname, '..', '..', '..', 'casperjs', 'bin', 'casperjs');
      }
    }
    if (process.platform === 'win32') {
      command += ".exe";
    }
    var args = ['test'],
        spawn = require('child_process').spawn,
        phantomBinPath = require('phantomjs-prebuilt').path;

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

    if (!options.silent) {
      grunt.log.writeln("Command: " + command);
    }

    process.env["PHANTOMJS_EXECUTABLE"] = phantomBinPath;

    if (!options.silent) {
      grunt.log.write('\nRunning tests from "' + filepath + '":\n');
    }

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
