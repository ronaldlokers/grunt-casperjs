var path = require('path')

exports.init = function(grunt) {
  var exports = {};

  exports.casperjs = function(filepath, options, callback) {

    var command = path.join(__dirname, '..', '..', 'casperjs'),
        args = ['test'],
        spawn = require('child_process').spawn,
        phantomBinPath = require('phantomjs').path;

    // Add options documented in the following web site:
    //   http://casperjs.org/testing.html
    if (options.xunit) {
      args.push('--xunit=' + options.xunit);
    }

    if (options.direct) {
      args.push('--direct');
    }

    if (options.includes) {
      args.push('--includes=' + options.includes.join(','));
    }

    if (options.logLevel) {
      args.push('--log-level=' + options.logLevel);
    }

    if (options.engine) {
      args.push('--engine=' + options.engine);
    }

    if (options.pre) {
      args.push('--pre=' + options.pre.join(','));
    }

    if (options.post) {
      args.push('--post=' + options.post.join(','));
    }

    if (options.webSecurity === false) {
      args.push('--web-security=no');
    }

    if (options.proxy) {
      args.push('--proxy='+ options.proxy);
    }

    if (options.proxyType) {
      args.push('--proxy-type='+ options.proxyType);
    }

    if (options.outputEncoding) {
      args.push('--output-encoding='+ options.outputEncoding);
    }

    if (options.sslProtocol) {
      args.push('--ssl-protocol='+ options.sslProtocol);
    }

    if (options.cookiesFile) {
      args.push('--cookies-file='+ options.cookiesFile);
    }

    if (options.ignoreSslErrors) {
      args.push('--ignore-ssl-errors=yes');
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
