var path = require('path');
var fs = require('fs');
var kew = require('kew');

exports.init = function(grunt) {
  var exports = {};

  exports.casperjs = function(filepath, options, callback) {

    var command = "./node_modules/.bin/casperjs";
    if (!fs.existsSync(command)) {
      command = path.join(__dirname, '..', '..', 'node_modules', '.bin', 'casperjs');
      if (!fs.existsSync(command)) {
        command = path.join(__dirname, '..', '..', '..', 'casperjs', 'bin', 'casperjs');
      }
    }
    if (process.platform === 'win32') {
      command += ".cmd";
    }
    var args = ['test'],
        spawn = require('child_process').spawn,
        phantomBinPath = require('phantomjs').path,
        slimerBinPath = require('slimerjs').path,
        usePhantom = true,
        useSlimer = false;

    if (options.engines) {
      if (options.engines.phantomjs === false) {
        usePhantom = false;
      }
      //slimer doesn't run headless, so leave it off by default
      if (options.engines.slimerjs === true) {
        useSlimer = true;
      }
    }

    if (options.casperjsOptions && options.casperjsOptions.length > 0) {
        args = args.concat(options.casperjsOptions);
    }

    args.push(filepath);

    grunt.log.writeln("Command: " + command);

    grunt.log.write('\nRunning tests from "' + filepath + '":\n');

    var deferred = kew.defer();

    if (usePhantom) {
      grunt.log.writeln('Executing tests with PhantomJS');
      grunt.log.writeln('PhantomJS path: ' + phantomBinPath);
      process.env["PHANTOMJS_EXECUTABLE"] = phantomBinPath;
      grunt.util.spawn({
        cmd: command,
        args: args,
        opts: {
          // pipe stdout/stderr through
          stdio: 'inherit'
        }
      }, function(error, stdout, code) {
        process.env["PHANTOMJS_EXECUTABLE"] = "";
        deferred.resolve();
        if (error) {
          callback(error);
        }
      });
    } else {
      grunt.log.writeln('Skipping tests with PhantomJS');
      deferred.resolve();
    }

    deferred.promise.then(function () {
      args.push('--engine=slimerjs');
      if (useSlimer) {
        grunt.log.writeln('Executing tests with SlimerJS');
        grunt.log.writeln('SlimerJS path: ' + slimerBinPath);
        process.env["SLIMERJS_EXECUTABLE"] = slimerBinPath;
        grunt.util.spawn({
          cmd: command,
          args: args,
          opts: {
            // pipe stdout/stderr through
            stdio: 'inherit'
          }
        }, function(error, stdout, code) {
          process.env["SLIMERJS_EXECUTABLE"] = "";
          callback(error);
        });
      } else {
        grunt.log.writeln('Skipping tests with SlimerJS');
        callback();
      }
    });

  };

  return exports;
};
