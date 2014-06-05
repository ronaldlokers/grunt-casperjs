'use strict'

var cp = require('child_process')
var fs = require('fs')
var http = require('http')
var https = require('https')
var path = require('path')
var url = require('url')
var rimraf = require('rimraf').sync
var AdmZip = require('adm-zip')
var request = require('request')

fs.existsSync = fs.existsSync || path.existsSync

var libPath = path.join(__dirname, 'lib', 'casperjs')
var tmpPath = path.join(__dirname, 'tmp')
var version = '1.0.3'
var downloadUrl = 'https://codeload.github.com/n1k0/casperjs/zip/' + version



function isCasperInstalled(notInstalledCallback) {
    // Note that "which" doesn't work on windows.
    cp.exec("casperjs --version", function(error, stdout, stderr) {
        if ( error ) {
            console.log("Casperjs not installed.  Installing...");
            notInstalledCallback();
        } else {
            var casperVersion = stdout.replace(/^\s+|\s+$/g,'');
            cp.exec("casperjs '" + path.join(__dirname, "tasks", "lib", "casperjs-path.js") + "'", function(error, stdout, stderr) {
                var casperPath = stdout.replace(/^\s+|\s+$/g,'');
                console.log("Casperjs version " + casperVersion + " installed at " + casperPath);
                var casperExecutable = path.join(casperPath, "bin", "casperjs");
                fs.symlinkSync(casperExecutable, './casperjs');
            });
        }
    });
}

function tidyUp() {
    rimraf(tmpPath);
}

function unzipTheZippedFile() {
    var zip = new AdmZip(path.join(tmpPath, 'archive.zip'));
    zip.extractAllTo(libPath, true);

    if (process.platform != 'win32') {
        var pathToCommand = path.join(libPath, 'casperjs-' + version, 'bin', 'casperjs');
        fs.symlinkSync(pathToCommand, './casperjs');
        var stat = fs.statSync(pathToCommand);
        if (!(stat.mode & 64)) {
            fs.chmodSync(pathToCommand, '755')
        }
    }
    tidyUp();
}

function downloadZipFromGithub() {
    var requestOptions = {
        uri: downloadUrl,
        encoding: null, // Get response as a buffer
        followRedirect: true, // The default download path redirects to a CDN URL.
        headers: {}
    };

    request(requestOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            fs.writeFileSync(path.join(tmpPath, "archive.zip"), body);

            console.log( Math.floor(body.length / 1025) + "KB received. Unzipping...");
            unzipTheZippedFile();
        } else if (response) {
            console.error('Error requesting archive.\n' +
                  'Status: ' + response.statusCode + '\n' +
                  'Request options: ' + JSON.stringify(requestOptions, null, 2) + '\n' +
                  'Response headers: ' + JSON.stringify(response.headers, null, 2) + '\n');

            tidyUp();
            exit(1);
        } else if (error) {
            console.error('Error making request.\n' + error.stack + '\n\n' +
              'Please report this full log at https://github.com/ronaldlokers/grunt-casperjs');

            tidyUp();
            exit(1);
        } else {
            console.error('Something unexpected happened, please report this full ' +
              'log at https://github.com/ronaldlokers/grunt-casperjs');

            tidyUp();
            exit(1);
       }
    });
}

isCasperInstalled(function() {
    if (!fs.existsSync(tmpPath)) {
        fs.mkdirSync(tmpPath);
    }
    rimraf(libPath);

    downloadZipFromGithub();
});
